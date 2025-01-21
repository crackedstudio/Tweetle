import egg from "../../assets/svg/egg.svg";
import hot from "../../assets/svg/hot.svg";
import moreIcon from "../../assets/svg/moreIcon.svg";

export default function HomeStats() {
    return (
        <div className="flex justify-center gap-x-6 items-center py-2">
            <div className="bg-[#17181D] h-[80px] w-[80px] rounded-full flex flex-col items-center justify-center">
                <h6 className="text-[10px] leading-4 text-[#F5F5F599]">
                    Level
                </h6>
                <img src={egg} className="my-[2px]" alt="" />
                <h5 className="text-[10px] leading-4 text-white">Novice</h5>
            </div>
            <div className="bg-[#17181D] h-[80px] w-[80px] rounded-full flex flex-col items-center justify-center">
                <img src={hot} className="my-[2px]" alt="" />
            </div>
            <div className="bg-[#17181D] h-[80px] w-[80px] rounded-full flex flex-col items-center justify-center">
                <img src={moreIcon} className="my-[2px]" alt="" />
            </div>
        </div>
    );
}
