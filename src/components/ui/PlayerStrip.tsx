import firstPlace from "../../assets/svg/firstplace-medal.svg";
import secondPlace from "../../assets/svg/secondplace-medal.svg";
import thirdPlace from "../../assets/svg/thirdplace-medal.svg";

export default function PlayerStrip({
    player,
    showPosition = true,
}: {
    player: {
        username?: string;
        points?: number;
        position: number;
    };
    showPosition?: boolean;
}) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-stretch gap-x-2">
                {
                    <div className="w-10 h-10 bg-[#6AAA64] text-center flex items-center justify-center">
                        {player.username
                            ? player.username.slice(0, 2).toUpperCase()
                            : "REF"}
                    </div>
                }
                <div className="flex flex-col space-y-2 text-sm leading-[15px] font-medium">
                    <h3 className="text-white font-bold uppercase">
                        {player.username}
                    </h3>
                    <h4 className="text-[#F5F5F5B2]">{player.points} Points</h4>
                </div>
            </div>
            {showPosition && player.position === 1 && (
                <img src={firstPlace} alt="" />
            )}
            {showPosition && player.position === 2 && (
                <img src={secondPlace} alt="" />
            )}
            {showPosition && player.position === 3 && (
                <img src={thirdPlace} alt="" />
            )}
            {showPosition && player.position > 3 && (
                <h3 className="text-base leading-[15px] font-bold text-white">
                    #{player.position}
                </h3>
            )}
        </div>
    );
}
