import { useOutletContext } from "react-router-dom";
import checkmark from "../../assets/svg/checkmark-badge-01.svg";
// import { Contract } from "starknet";
// import gameAbi from "../../utils/gameAbi.json";
import { useEffect } from "react";
import useGameLogic from "../../hooks/useGameLogic";
import { useNavigate } from "react-router-dom";

const GAMES_LIST = [
    { id: 1, active: false, played: false },
    { id: 2, active: false, played: false },
    { id: 3, active: false, played: false },
    { id: 4, active: false, played: false },
    { id: 5, active: false, played: false },
    { id: 6, active: false, played: false },
    { id: 7, active: false, played: false },
    { id: 8, active: false, played: false },
    { id: 9, active: false, played: false },
    { id: 10, active: false, played: false },
    { id: 11, active: false, played: false },
    { id: 12, active: false, played: false },
    { id: 13, active: false, played: false },
    { id: 14, active: false, played: false },
    { id: 15, active: false, played: false },
    { id: 16, active: false, played: false },
    { id: 17, active: false, played: false },
    { id: 18, active: false, played: false },
    { id: 19, active: false, played: false },
    { id: 20, active: false, played: false },
    { id: 21, active: false, played: false },
    { id: 22, active: false, played: false },
    { id: 23, active: false, played: false },
    { id: 24, active: false, played: false },
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
        fetchClassicGameAttempts,
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
                } catch (error) {
                    console.error("Error fetching games:", error);
                }
            }
        };
        updateGameState();
    }, []);

    const handleCreateNewGame = async () => {
        try {
            if (!account) {
                return;
            }
            console.log("starting/..............");
            const txn = await createNewClassicGame();
            console.log("created new classic game with hash======", txn);
        } catch (err) {
            console.log(err);
        }
    };
    //han
    const handleGameStart = async (_id: number) => {
        try {
            if (!account) {
                return;
            }
            console.log("starting/..............");
            const _gameDetails = await fetchClassicGameDetails(_id);
            const _gameIndex = _gameDetails.word_index;
            const _gameId = _gameDetails.id;
            console.log("gameIndex is ___========>>>>>>>>>>>>", _gameIndex);
            console.log("gameId is ___========>>>>>>>>>>>>", _gameId);

            const _gameAttempts = await fetchClassicGameAttempts(
                Number(_gameId)
            );
            navigate("/play", {
                state: {
                    classicGameAttempts: _gameAttempts,
                    classicGameIndex: Number(_gameIndex),
                    classicGameId: Number(_gameId),
                },
            });
        } catch (err) {
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
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
interface GameBoxProps {
    id: number;
    active: boolean;
    played?: boolean;
    action: () => {};
}
const GameBox = ({ id, active, played, action }: GameBoxProps) => {
    return (
        // <Link to={active ? "/play" : "/classic"}>
        <div
            className={
                active
                    ? "border border-1 bg-button-image bg-cover bg-center flex justify-center items-center w-[80px] h-[80px] rounded-lg relative"
                    : "border border-1 bg-button-image bg-cover bg-center flex justify-center items-center w-[80px] h-[80px] rounded-lg relative blur-[2px]"
            }
            onClick={action}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg"></div>
            {played && (
                <img
                    src={checkmark}
                    alt="check-mark"
                    className="absolute top-0 left-[70%]"
                />
            )}
            <div className="text-center relative z-10">
                <p className="text-xl">{id}</p>
            </div>
        </div>
        // </Link>
    );
};

export default ClassicGamesList;
