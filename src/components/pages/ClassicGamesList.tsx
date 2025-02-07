import { useOutletContext } from "react-router-dom";
import checkmark from "../../assets/svg/checkmark-badge-01.svg";
// import { Contract } from "starknet";
// import gameAbi from "../../utils/gameAbi.json";
import { useEffect, useState } from "react";
import useGameLogic from "../../hooks/useGameLogic";
import { useNavigate } from "react-router-dom";
import GenModal from "../modal/GenModal";
import { Bounce, toast } from "react-toastify";

const GAMES_LIST = [
    { id: 1, active: false, played: false, isNext: false },
    { id: 2, active: false, played: false, isNext: false },
    { id: 3, active: false, played: false, isNext: false },
    { id: 4, active: false, played: false, isNext: false },
    { id: 5, active: false, played: false, isNext: false },
    { id: 6, active: false, played: false, isNext: false },
    { id: 7, active: false, played: false, isNext: false },
    { id: 8, active: false, played: false, isNext: false },
    { id: 9, active: false, played: false, isNext: false },
    { id: 10, active: false, played: false, isNext: false },
    { id: 11, active: false, played: false, isNext: false },
    { id: 12, active: false, played: false, isNext: false },
    { id: 13, active: false, played: false, isNext: false },
    { id: 14, active: false, played: false, isNext: false },
    { id: 15, active: false, played: false, isNext: false },
    { id: 16, active: false, played: false, isNext: false },
    { id: 17, active: false, played: false, isNext: false },
    { id: 18, active: false, played: false, isNext: false },
    { id: 19, active: false, played: false, isNext: false },
    { id: 20, active: false, played: false, isNext: false },
    { id: 21, active: false, played: false, isNext: false },
    { id: 22, active: false, played: false, isNext: false },
    { id: 23, active: false, played: false, isNext: false },
    { id: 24, active: false, played: false, isNext: false },
    { id: 25, active: false, played: false, isNext: false },
    { id: 26, active: false, played: false, isNext: false },
    { id: 27, active: false, played: false, isNext: false },
    { id: 28, active: false, played: false, isNext: false },
    { id: 29, active: false, played: false, isNext: false },
    { id: 30, active: false, played: false, isNext: false },
    { id: 31, active: false, played: false, isNext: false },
    { id: 32, active: false, played: false, isNext: false },
    { id: 33, active: false, played: false, isNext: false },
    { id: 34, active: false, played: false, isNext: false },
    { id: 35, active: false, played: false, isNext: false },
    { id: 36, active: false, played: false, isNext: false },
    { id: 37, active: false, played: false, isNext: false },
    { id: 38, active: false, played: false, isNext: false },
    { id: 39, active: false, played: false, isNext: false },
    { id: 40, active: false, played: false, isNext: false },
    { id: 41, active: false, played: false, isNext: false },
    { id: 42, active: false, played: false, isNext: false },
    { id: 43, active: false, played: false, isNext: false },
    { id: 44, active: false, played: false, isNext: false },
    { id: 45, active: false, played: false, isNext: false },
    { id: 46, active: false, played: false, isNext: false },
    { id: 47, active: false, played: false, isNext: false },
    { id: 48, active: false, played: false, isNext: false },
    { id: 49, active: false, played: false, isNext: false },
    { id: 50, active: false, played: false, isNext: false },
    { id: 51, active: false, played: false, isNext: false },
    { id: 52, active: false, played: false, isNext: false },
    { id: 53, active: false, played: false, isNext: false },
    { id: 54, active: false, played: false, isNext: false },
    { id: 55, active: false, played: false, isNext: false },
    { id: 56, active: false, played: false, isNext: false },
    { id: 57, active: false, played: false, isNext: false },
    { id: 58, active: false, played: false, isNext: false },
    { id: 59, active: false, played: false, isNext: false },
    { id: 60, active: false, played: false, isNext: false },
    { id: 61, active: false, played: false, isNext: false },
    { id: 62, active: false, played: false, isNext: false },
    { id: 63, active: false, played: false, isNext: false },
    { id: 64, active: false, played: false, isNext: false },
    { id: 65, active: false, played: false, isNext: false },
    { id: 66, active: false, played: false, isNext: false },
    { id: 67, active: false, played: false, isNext: false },
    { id: 68, active: false, played: false, isNext: false },
    { id: 69, active: false, played: false, isNext: false },
    { id: 70, active: false, played: false, isNext: false },
    { id: 71, active: false, played: false, isNext: false },
    { id: 72, active: false, played: false, isNext: false },
    { id: 73, active: false, played: false, isNext: false },
    { id: 74, active: false, played: false, isNext: false },
    { id: 75, active: false, played: false, isNext: false },
    { id: 76, active: false, played: false, isNext: false },
    { id: 77, active: false, played: false, isNext: false },
    { id: 78, active: false, played: false, isNext: false },
    { id: 79, active: false, played: false, isNext: false },
    { id: 80, active: false, played: false, isNext: false },
    { id: 81, active: false, played: false, isNext: false },
    { id: 82, active: false, played: false, isNext: false },
    { id: 83, active: false, played: false, isNext: false },
    { id: 84, active: false, played: false, isNext: false },
    { id: 85, active: false, played: false, isNext: false },
    { id: 86, active: false, played: false, isNext: false },
    { id: 87, active: false, played: false, isNext: false },
    { id: 88, active: false, played: false, isNext: false },
    { id: 89, active: false, played: false, isNext: false },
    { id: 90, active: false, played: false, isNext: false },
    { id: 91, active: false, played: false, isNext: false },
    { id: 92, active: false, played: false, isNext: false },
    { id: 93, active: false, played: false, isNext: false },
    { id: 94, active: false, played: false, isNext: false },
    { id: 95, active: false, played: false, isNext: false },
    { id: 96, active: false, played: false, isNext: false },
    { id: 97, active: false, played: false, isNext: false },
    { id: 98, active: false, played: false, isNext: false },
    { id: 99, active: false, played: false, isNext: false },
    { id: 100, active: false, played: false, isNext: false },
    { id: 101, active: false, played: false, isNext: false },
    { id: 102, active: false, played: false, isNext: false },
    { id: 103, active: false, played: false, isNext: false },
    { id: 104, active: false, played: false, isNext: false },
    { id: 105, active: false, played: false, isNext: false },
    { id: 106, active: false, played: false, isNext: false },
    { id: 107, active: false, played: false, isNext: false },
    { id: 108, active: false, played: false, isNext: false },
    { id: 109, active: false, played: false, isNext: false },
    { id: 110, active: false, played: false, isNext: false },
    { id: 111, active: false, played: false, isNext: false },
    { id: 112, active: false, played: false, isNext: false },
    { id: 113, active: false, played: false, isNext: false },
    { id: 114, active: false, played: false, isNext: false },
    { id: 115, active: false, played: false, isNext: false },
    { id: 116, active: false, played: false, isNext: false },
    { id: 117, active: false, played: false, isNext: false },
    { id: 118, active: false, played: false, isNext: false },
    { id: 119, active: false, played: false, isNext: false },
    { id: 120, active: false, played: false, isNext: false },
    { id: 121, active: false, played: false, isNext: false },
    { id: 122, active: false, played: false, isNext: false },
    { id: 123, active: false, played: false, isNext: false },
    { id: 124, active: false, played: false, isNext: false },
    { id: 125, active: false, played: false, isNext: false },
    { id: 126, active: false, played: false, isNext: false },
    { id: 127, active: false, played: false, isNext: false },
    { id: 128, active: false, played: false, isNext: false },
    { id: 129, active: false, played: false, isNext: false },
    { id: 130, active: false, played: false, isNext: false },
    { id: 131, active: false, played: false, isNext: false },
    { id: 132, active: false, played: false, isNext: false },
    { id: 133, active: false, played: false, isNext: false },
    { id: 134, active: false, played: false, isNext: false },
    { id: 135, active: false, played: false, isNext: false },
    { id: 136, active: false, played: false, isNext: false },
    { id: 137, active: false, played: false, isNext: false },
    { id: 138, active: false, played: false, isNext: false },
    { id: 139, active: false, played: false, isNext: false },
    { id: 140, active: false, played: false, isNext: false },
    { id: 141, active: false, played: false, isNext: false },
    { id: 142, active: false, played: false, isNext: false },
    { id: 143, active: false, played: false, isNext: false },
    { id: 144, active: false, played: false, isNext: false },
    { id: 145, active: false, played: false, isNext: false },
    { id: 146, active: false, played: false, isNext: false },
    { id: 147, active: false, played: false, isNext: false },
    { id: 148, active: false, played: false, isNext: false },
    { id: 149, active: false, played: false, isNext: false },
    { id: 150, active: false, played: false, isNext: false },
    { id: 151, active: false, played: false, isNext: false },
    { id: 152, active: false, played: false, isNext: false },
    { id: 153, active: false, played: false, isNext: false },
    { id: 154, active: false, played: false, isNext: false },
    { id: 155, active: false, played: false, isNext: false },
    { id: 156, active: false, played: false, isNext: false },
    { id: 157, active: false, played: false, isNext: false },
    { id: 158, active: false, played: false, isNext: false },
    { id: 159, active: false, played: false, isNext: false },
    { id: 160, active: false, played: false, isNext: false },
    { id: 161, active: false, played: false, isNext: false },
    { id: 162, active: false, played: false, isNext: false },
    { id: 163, active: false, played: false, isNext: false },
    { id: 164, active: false, played: false, isNext: false },
    { id: 165, active: false, played: false, isNext: false },
    { id: 166, active: false, played: false, isNext: false },
    { id: 167, active: false, played: false, isNext: false },
    { id: 168, active: false, played: false, isNext: false },
    { id: 169, active: false, played: false, isNext: false },
    { id: 170, active: false, played: false, isNext: false },
    { id: 171, active: false, played: false, isNext: false },
    { id: 172, active: false, played: false, isNext: false },
    { id: 173, active: false, played: false, isNext: false },
    { id: 174, active: false, played: false, isNext: false },
    { id: 175, active: false, played: false, isNext: false },
    { id: 176, active: false, played: false, isNext: false },
    { id: 177, active: false, played: false, isNext: false },
    { id: 178, active: false, played: false, isNext: false },
    { id: 179, active: false, played: false, isNext: false },
    { id: 180, active: false, played: false, isNext: false },
    { id: 181, active: false, played: false, isNext: false },
    { id: 182, active: false, played: false, isNext: false },
    { id: 183, active: false, played: false, isNext: false },
    { id: 184, active: false, played: false, isNext: false },
    { id: 185, active: false, played: false, isNext: false },
    { id: 186, active: false, played: false, isNext: false },
    { id: 187, active: false, played: false, isNext: false },
    { id: 188, active: false, played: false, isNext: false },
    { id: 189, active: false, played: false, isNext: false },
    { id: 190, active: false, played: false, isNext: false },
    { id: 191, active: false, played: false, isNext: false },
    { id: 192, active: false, played: false, isNext: false },
    { id: 193, active: false, played: false, isNext: false },
    { id: 194, active: false, played: false, isNext: false },
    { id: 195, active: false, played: false, isNext: false },
    { id: 196, active: false, played: false, isNext: false },
    { id: 197, active: false, played: false, isNext: false },
    { id: 198, active: false, played: false, isNext: false },
    { id: 199, active: false, played: false, isNext: false },
    { id: 200, active: false, played: false, isNext: false },
];

interface OutletContextType {
    account: any | null;
    handleConnectButton: () => void;
    handleClearSessionButton: () => void;
    isConnected: boolean;
    playerDetails: {};
    playerClassicGameCount: number;
    playerClassicGames: any;
    updatePlayerClassicGames: ([]) => void;
    updatePlayerClassicGameCount: (a: number) => void;
}

const ClassicGamesList = () => {
    const [genModal, setGenModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const {
        account,
        playerClassicGames,
        playerClassicGameCount,
        updatePlayerClassicGames,
        updatePlayerClassicGameCount,
    } = useOutletContext<OutletContextType>();
    const {
        fetchUserClassicGames,
        createNewClassicGame,
        fetchClassicGameDetails,
        // fetchClassicGameAttempts,
        getAttempts,
    } = useGameLogic();

    const chunkedGames = [];

    for (let i = 0; i < playerClassicGames.length; i++) {
        GAMES_LIST[i].active = true;
        if (playerClassicGames[i].is_completed) {
            GAMES_LIST[i].played = true;
        }
    }

    for (let i = 0; i < GAMES_LIST.length; i += 4) {
        chunkedGames.push(GAMES_LIST.slice(i, i + 4));
    }

    useEffect(() => {
        const updateGameState = async () => {
            if (playerClassicGameCount === 0) {
                try {
                    handleCreateNewGame();
                    const _playerClassicGames = await fetchUserClassicGames();
                    updatePlayerClassicGames(_playerClassicGames);
                    updatePlayerClassicGameCount(
                        Number(_playerClassicGames.length)
                    );
                    setRefresh(!refresh);
                } catch (error) {
                    callToast("Error fetching games, try again");
                    console.error("Error fetching games:", error);
                    setRefresh(!refresh);
                }
            } else {
                try {
                    const _playerClassicGames = await fetchUserClassicGames();
                    updatePlayerClassicGames(_playerClassicGames);
                    updatePlayerClassicGameCount(
                        Number(_playerClassicGames.length)
                    );
                    setRefresh(!refresh);
                } catch (error) {
                    callToast("Error fetching games, try again");
                    console.error("Error fetching games:", error);
                    setRefresh(!refresh);
                }
            }
        };
        updateGameState();
    }, [GAMES_LIST, refresh]);

    useEffect(() => {
        if (playerClassicGames) {
            GAMES_LIST[playerClassicGames.length].isNext = true;
            GAMES_LIST[playerClassicGames.length - 1].isNext = false;
        }
    }, [GAMES_LIST, refresh]);

    const callToast = (msg: string) => {
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

    const handleCreateNewGame = async () => {
        setGenModal(true);
        try {
            if (!account) {
                return;
            }
            callToast("Creating new game 🦉");
            const txn = await createNewClassicGame();
            console.log("created new classic game with hash======", txn);
            callToast(
                "Successfully created new game 🐣, refresh page to see game"
            );
            setGenModal(false);
            setRefresh(!refresh);
        } catch (err) {
            callToast("Error creating new game, try again");
            console.log(err);
            setGenModal(false);
            setRefresh(!refresh);
        }
    };
    //han
    const handleGameStart = async (_id: number) => {
        try {
            if (!account) {
                return;
            }
            setGenModal(true);
            console.log("starting/..............");
            const _gameDetails = await fetchClassicGameDetails(_id);
            const _gameIndex = _gameDetails.word_index;
            const _gameId = _gameDetails.id;
            console.log("gameIndex is ___========>>>>>>>>>>>>", _gameIndex);
            console.log("gameId is ___========>>>>>>>>>>>>", _gameId);

            // const _gameAttempts = await fetchClassicGameAttempts(
            //     Number(_gameId)
            // );

            const _attempts = await getAttempts(false, String(_gameId));
            const _gameAttempts = _attempts.map((item) => item.attempt);
            const _gameState = _attempts.map((item) => item.state);
            setGenModal(false);
            navigate("/play", {
                state: {
                    classicGameAttempts: _gameAttempts,
                    classicGameIndex: Number(_gameIndex),
                    classicGameId: Number(_gameId),
                    classicGameState: _gameState,
                },
            });
        } catch (err) {
            callToast("Error starting classic game, try again");
            console.log(err);
        }
    };

    return (
        <div className="bg-black p-3">
            {chunkedGames.map((gamesRow, rowIndex) => (
                <div
                    key={rowIndex}
                    className="flex mb-4 space-x-2 justify-center items-center"
                >
                    {gamesRow.map((game) => (
                        <GameBox
                            id={game.id}
                            active={game.active}
                            played={game.played}
                            action={() => handleGameStart(game.id)}
                            nextAction={handleCreateNewGame}
                            next={game.isNext}
                            key={game.id}
                            isLoading={genModal}
                        />
                    ))}
                </div>
            ))}
            {genModal && <GenModal />}
        </div>
    );
};
interface GameBoxProps {
    id: number;
    active: boolean;
    played?: boolean;
    action: () => {};
    next?: boolean;
    nextAction?: () => {};
    isLoading: boolean;
}

const GameBox = ({
    id,
    active,
    played,
    action,
    next,
    nextAction,
    isLoading,
}: GameBoxProps) => {
    return (
        <div className="relative w-[80px] h-[80px]">
            {" "}
            {/* Container div */}
            <button
                className={
                    active
                        ? "border border-1 bg-button-image bg-cover bg-center flex justify-center items-center w-[80px] h-[80px] rounded-lg relative"
                        : "border border-1 bg-button-image bg-cover bg-center flex justify-center items-center w-[80px] h-[80px] rounded-lg relative blur-[2px]"
                }
                onClick={action}
                disabled={!active}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg"></div>
                {played && (
                    <img
                        src={checkmark}
                        alt="check-mark"
                        className="absolute top-0 left-[70%]"
                    />
                )}
                <div className="text-center relative">
                    <p className="text-xl">{id}</p>
                </div>
            </button>
            {/* Separate + button outside the blurred area */}
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

export default ClassicGamesList;
