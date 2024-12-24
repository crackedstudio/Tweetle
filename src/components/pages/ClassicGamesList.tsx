import { Link } from "react-router-dom";

const GAMES_LIST = [
    { id: 1, active: true },
    { id: 2, active: true },
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

const ClassicGamesList = () => {
    const chunkedGames = [];
    for (let i = 0; i < GAMES_LIST.length; i += 4) {
        chunkedGames.push(GAMES_LIST.slice(i, i + 4));
    }

    return (
        <div className="bg-black p-3">
            {chunkedGames.map((gamesRow, rowIndex) => (
                <div
                    key={rowIndex}
                    className="flex mb-4 space-x-2 justify-center items-center"
                >
                    {gamesRow.map((game) => (
                        <GameBox id={game.id} active={game.active} />
                    ))}
                </div>
            ))}
        </div>
    );
};
interface GameBoxProps {
    id: number;
    active: boolean;
}
const GameBox = ({ id, active }: GameBoxProps) => {
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
                <div className="text-center relative z-10">
                    <p className="text-xl">{id}</p>
                </div>
            </div>
        </Link>
    );
};

export default ClassicGamesList;
