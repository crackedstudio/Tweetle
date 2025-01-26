import PlayerStrip from "../components/ui/PlayerStrip";
import readingOwl from "../assets/reading-owl.png";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

// Define proper interfaces for the data structure
interface Player {
    username?: string;
    points: number;
}

interface OutletContextType {
    allPlayers: Player[];
    playerDetails: Player;
}

interface PlayerStripped {
    name: string;
    abbreviation: string;
    points: number;
    position?: number;
}

export default function Leaderboard() {
    const { allPlayers, playerDetails } = useOutletContext<OutletContextType>();
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [userRanking, setUserRanking] = useState<number>(0);
    const [username, setUsername] = useState<string | null>(null);
    const [sortedPlayers, setSortedPlayers] = useState<PlayerStripped[]>([]);

    const getTotalPointsEarned = (): number => {
        return allPlayers.reduce(
            (acc, player) => acc + Number(player.points),
            0
        );
    };

    const getPlayerRanking = (): number => {
        const currentPlayerPoints = Number(playerDetails?.points) || 0;
        return allPlayers.reduce(
            (rank, player) =>
                Number(player.points) > currentPlayerPoints ? rank + 1 : rank,
            1
        );
    };

    const sortAllPlayers = (): PlayerStripped[] => {
        return allPlayers.map((player) => ({
            name: player.username || "user",
            abbreviation: player.username
                ? player.username.slice(0, 2).toUpperCase()
                : "US",
            points: Number(player.points),
        }));
    };

    useEffect(() => {
        setTotalPoints(getTotalPointsEarned());
        setUsername(localStorage.getItem("tg_name"));
        setUserRanking(getPlayerRanking());
        setSortedPlayers(sortAllPlayers());
    }, [allPlayers, playerDetails]); // Add dependencies to prevent infinite loop

    return (
        <div>
            <div className="pt-[40px] pb-6 flex flex-col items-center bg-gradient-svg">
                <div className="flex justify-center items-center gap-x-1 mb-4">
                    <img src={readingOwl} className="w-10 h-10" alt="" />
                    <h1 className="text-[24px] leading-5 font-bold">Tweetle</h1>
                </div>
                <h4 className="text-[24px] leading-5 font-medium">
                    All Time Highscores
                </h4>
            </div>
            <div className="py-6 px-4 bg-black">
                <div className="p-4 rounded-[10px] bg-[#18191B] flex justify-between items-center">
                    <div className="flex gap-x-2 items-center">
                        <div className="py-[15px] w-fit h-fit rounded px-[7.5px] bg-[#4F5285] text-[32px] leading-8 font-bold text-white">
                            {username?.slice(0, 2).toUpperCase() || "US"}
                        </div>
                        <div className="flex flex-col leading-8 font-bold">
                            <h3 className="text-base">{username || "user"}</h3>
                            <h5 className="text-sm font-medium text-[#F5F5F5B2]">
                                {Number(playerDetails?.points || 0)} Points
                            </h5>
                        </div>
                    </div>
                    <h5 className="text-base leading-8 font-bold text-white">
                        #{userRanking}
                    </h5>
                </div>

                <h4 className="text-base leading-5 font-extrabold my-6 text-center">
                    {totalPoints} Points Earned
                </h4>
                <div className="flex flex-col gap-y-6">
                    {sortedPlayers
                        .sort((a, b) => b.points - a.points)
                        .map((player, i) => ({
                            ...player,
                            position: i + 1,
                        }))
                        .map((player, i) => (
                            <PlayerStrip key={i} player={player} />
                        ))}
                </div>
            </div>
        </div>
    );
}
