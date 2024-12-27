import { Link, useOutletContext } from "react-router-dom";
import checkmark from "../../assets/svg/checkmark-badge-01.svg";
import { Contract } from "starknet";
import gameAbi from "../../utils/gameAbi.json";
import { useEffect, useState } from "react";

const GAMES_LIST = [
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
    { id: 4, active: false },
    { id: 5, active: false },
    { id: 6, active: false },
    { id: 7, active: false },
    { id: 8, active: false },
    { id: 9, active: false },
    { id: 10, active: false },
    { id: 11, active: false },
    { id: 12, active: false },
    { id: 13, active: false },
    { id: 14, active: false },
    { id: 15, active: false },
    { id: 16, active: false },
    { id: 17, active: false },
    { id: 18, active: false },
    { id: 19, active: false },
    { id: 20, active: false },
    { id: 21, active: false },
    { id: 22, active: false },
    { id: 23, active: false },
    { id: 24, active: false },
];

interface OutletContextType {
    account: any | null;
    handleConnectButton: () => void;
    handleClearSessionButton: () => void;
    isConnected: boolean;
    playerDetails: {};
}

const ClassicGamesList = () => {
    const { account, playerDetails } = useOutletContext<OutletContextType>();
    const [allGames, setAllGames] = useState([]);

    const fetchAllUserGames = async () => {
        if (!account) return;
        const game_addr =
            "0x033ccdb04e78933097705e1847779f59db1c868f4da503c87d5a776854256fca";
        const gameContract = new Contract(gameAbi, game_addr, account);

        try {
            if (!account) {
                return;
            }
            const _playerGames = await gameContract.get_player_games(
                account.address
            );
            return _playerGames;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const chunkedGames = [];

    for (let i = 0; i <= playerDetails.game_count + 1; i++) {
        GAMES_LIST[i].active = true;
    }
    for (let i = 0; i < GAMES_LIST.length; i += 4) {
        chunkedGames.push(GAMES_LIST.slice(i, i + 4));
    }

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const playerGames = await fetchAllUserGames();
                setAllGames(playerGames);
                playerGames.map((game) =>
                    console.log(
                        "player game secret word ____----____" +
                            String(game.secret_word)
                    )
                );
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
                            played={game.active}
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
