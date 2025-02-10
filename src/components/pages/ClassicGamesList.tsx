import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import useGameLogic from "../../hooks/useGameLogic";
import checkmark from "../../assets/svg/checkmark-badge-01.svg";
import NeonSpinner from "../modal/NeonSpinner";

// Types
interface Game {
    id: number;
    active: boolean;
    played: boolean;
    isNext: boolean;
}

interface OutletContextType {
    account: any | null;
    handleConnectButton: () => void;
    handleClearSessionButton: () => void;
    isConnected: boolean;
    playerDetails: Record<string, unknown>;
    playerClassicGameCount: number;
    playerClassicGames: any[];
    updatePlayerClassicGames: (games: any[]) => void;
    updatePlayerClassicGameCount: (count: number) => void;
}

interface GameBoxProps {
    id: number;
    active: boolean;
    played?: boolean;
    action: () => void;
    next?: boolean;
    nextAction?: () => void;
    isLoading: boolean;
}

// Constants
const INITIAL_GAMES_LIST: Game[] = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    active: false,
    played: false,
    isNext: false,
}));

// Helper Functions
const createToast = (msg: string) => {
    return toast(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
};

const GameBox = ({
    id,
    active,
    played,
    action,
    next,
    nextAction,
    isLoading,
}: GameBoxProps) => {
    const baseButtonClass =
        "border border-gray-600 bg-button-image bg-cover bg-center flex justify-center items-center w-20 h-20 rounded-lg relative";

    return (
        <div className="relative w-[80px] h-[80px]">
            <button
                className={`${baseButtonClass} ${!active ? "blur-[2px]" : ""}`}
                onClick={action}
                disabled={!active}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg" />
                {played && (
                    <img
                        src={checkmark}
                        alt="check-mark"
                        className="absolute -top-1 left-[70%] w-6 h-6"
                    />
                )}
                <div className="text-center relative">
                    <p className="text-xl">{id}</p>
                </div>
            </button>
            {next && (
                <button
                    className="absolute inset-0 flex items-center justify-center z-20"
                    onClick={nextAction}
                >
                    <span className="text-white text-3xl font-bold">
                        {!isLoading && "+"}
                    </span>
                </button>
            )}
        </div>
    );
};

const ClassicGamesList = () => {
    const [gamesList, setGamesList] = useState<Game[]>(INITIAL_GAMES_LIST);
    const [isLoading, setIsLoading] = useState(false);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const navigate = useNavigate();

    const {
        account,
        playerClassicGameCount,
        updatePlayerClassicGames,
        updatePlayerClassicGameCount,
    } = useOutletContext<OutletContextType>();

    const {
        fetchUserClassicGames,
        createNewClassicGame,
        fetchClassicGameDetails,
        getAttempts,
    } = useGameLogic();

    useEffect(() => {
        const updateGameState = async () => {
            try {
                if (playerClassicGameCount === 0) {
                    await handleCreateNewGame();
                }
                const games = await fetchUserClassicGames();
                updatePlayerClassicGames(games);
                updatePlayerClassicGameCount(games.length);

                // Update games list state
                const updatedGames = [...INITIAL_GAMES_LIST];
                games.forEach((game: any, index: number) => {
                    updatedGames[index].active = true;
                    if (game.is_completed) {
                        updatedGames[index].played = true;
                    }
                });

                // Reset all isNext flags first
                updatedGames.forEach((game) => (game.isNext = false));

                // Set next game if there's room for more games
                if (games.length < updatedGames.length) {
                    updatedGames[games.length].isNext = true;
                }

                setGamesList(updatedGames);
            } catch (error) {
                createToast("Error fetching games, try again");
                console.error("Error fetching games:", error);
            }
        };

        updateGameState();
    }, [playerClassicGameCount, autoRefresh]);

    const handleCreateNewGame = async () => {
        if (!account) return;

        setIsLoading(true);
        createToast("Creating new game 🦉");
        setShowCreateModal(true);
        try {
            await createNewClassicGame();
            createToast(
                "Successfully created new game 🐣, page will refresh to see game"
            );
        } catch (err) {
            createToast("Error creating new game, try again");
            console.error(err);
        } finally {
            setIsLoading(false);
            setAutoRefresh(!autoRefresh);
            setShowCreateModal(false);
        }
    };

    const handleGameStart = async (gameId: number) => {
        if (!account) return;

        setIsLoading(true);

        try {
            const gameDetails = await fetchClassicGameDetails(gameId);
            const attempts = await getAttempts(false, String(gameDetails.id));

            navigate("/play", {
                state: {
                    classicGameAttempts: attempts.map((item) => item.attempt),
                    classicGameIndex: Number(gameDetails.word_index),
                    classicGameId: Number(gameDetails.id),
                    classicGameState: attempts.map((item) => item.state),
                },
            });
        } catch (err) {
            createToast("Error starting classic game, try again");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Create chunks of 4 games for display
    const chunkedGames = gamesList.reduce<Game[][]>((acc, _, index) => {
        if (index % 4 === 0) {
            acc.push(gamesList.slice(index, index + 4));
        }
        return acc;
    }, []);

    return (
        <div className="bg-black p-3">
            {chunkedGames.map((gamesRow, rowIndex) => (
                <div
                    key={rowIndex}
                    className="flex mb-4 space-x-2 justify-center items-center"
                >
                    {gamesRow.map((game) => (
                        <GameBox
                            key={game.id}
                            id={game.id}
                            active={game.active}
                            played={game.played}
                            action={() => handleGameStart(game.id)}
                            nextAction={handleCreateNewGame}
                            next={game.isNext}
                            isLoading={isLoading}
                        />
                    ))}
                </div>
            ))}
            {showCreateModal && (
                <NeonSpinner firstText="Creating" secondText="Game" />
            )}
        </div>
    );
};

export default ClassicGamesList;
