import PlayerStrip from "../components/ui/PlayerStrip";
import { dummyPlayers } from "../utils/data";
import readingOwl from "../assets/reading-owl.png";
export default function Leaderboard() {
    return (
        <div>
            <div className="pt-[40px] pb-6 flex flex-col items-center bg-gradient-svg">
                <div className="flex justify-center items-center gap-x-1 mb-4">
                    <img src={readingOwl} className="w-10 h-10" alt="" />
                    <h1 className=" text-[24px] leading-5 font-bold">
                        Tweetle
                    </h1>
                </div>
                <h4 className="text-[24px] leading-5 font-medium">
                    All Time Highscores
                </h4>
            </div>
            <div className="py-6 px-4 bg-black">
                <div className="p-4 rounded-[10px] bg-[#18191B] flex justify-between items-center">
                    <div className="flex gap-x-2 items-center">
                        <div className="py-[15px] w-fit h-fit rounded px-[7.5px] bg-[#4F5285] text-[32px] leading-8 font-bold text-white">
                            CA
                        </div>
                        <div className="flex flex-col leading-8 font-bold">
                            <h3 className="text-base">CALEBUX</h3>
                            <h5 className="text-sm font-medium text-[#F5F5F5B2]">
                                209 Points
                            </h5>
                        </div>
                    </div>
                    <h5 className="text-base leading-8 font-bold text-white">
                        #906370
                    </h5>
                </div>

                <h4 className="text-base leading-5 font-extrabold my-6 text-center">
                    12M Points Earned
                </h4>
                <div className="flex flex-col gap-y-6">
                    {dummyPlayers
                        .sort((a, b) => b.points - a.points)
                        .map((player, i) => {
                            return { ...player, position: i + 1 };
                        })
                        .map((player, i) => (
                            <PlayerStrip key={i} player={player} />
                        ))}
                </div>
            </div>
        </div>
    );
}
