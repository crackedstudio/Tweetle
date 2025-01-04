import { Link, useOutletContext } from "react-router-dom";
import checkmark from "../../assets/svg/checkmark-badge-01.svg";
import { Contract } from "starknet";
import gameAbi from "../../utils/gameAbi.json";
import { useEffect, useState } from "react";
import useGameLogic from "../../hooks/useGameLogic";

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
}

const ClassicGamesList = () => {
    const { playerDetails } = useOutletContext<OutletContextType>();
    const [allGames, setAllGames] = useState([]);
    const { fetchAllUserGames } = useGameLogic();

    const chunkedGames = [];

    for (let i = 0; i <= Number(playerDetails?.game_count) - 1; i++) {
        GAMES_LIST[i].active = true;
        GAMES_LIST[i].played = true;
    }
    GAMES_LIST[Number(playerDetails.game_count)].active = true;
    for (let i = 0; i < GAMES_LIST.length; i += 4) {
        chunkedGames.push(GAMES_LIST.slice(i, i + 4));
    }

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const playerGames = await fetchAllUserGames();
                console.log("player games -- -- - - ", playerGames);
                setAllGames(playerGames);
                if (!playerGames) return;
                // playerGames.map((game) =>
                //     console.log(
                //         "player game secret word ____----____" +
                //             String(game.secret_word)
                //     )
                // );
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };
        fetchGames();
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
                            id={game.id}
                            active={game.active}
                            played={game.played}
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
}
const GameBox = ({ id, active, played }: GameBoxProps) => {
    return (
        <Link to={active ? "/play" : "/classic"}>
            <div
                className={
                    active
                        ? "border border-1 bg-button-image bg-cover bg-center flex justify-center items-center w-[80px] h-[80px] rounded-lg relative"
                        : "border border-1 bg-button-image bg-cover bg-center flex justify-center items-center w-[80px] h-[80px] rounded-lg relative blur-[2px]"
                }
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
        </Link>
    );
};

export default ClassicGamesList;
