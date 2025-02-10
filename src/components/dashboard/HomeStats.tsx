import egg from "../../assets/svg/egg.svg";
import hot from "../../assets/svg/hot.svg";
import moreIcon from "../../assets/svg/moreIcon.svg";

export default function HomeStats() {
  return (
    <div className="flex justify-center gap-x-6 items-center py-4">
      <div className="bg-[#17181D] h-[70px] w-[70px] rounded-full flex flex-col items-center justify-center">
        <h6 className="text-[10px] leading-4 text-[#F5F5F599]">Level</h6>
        <img src={egg} className="my-[2px] w-[18px]" alt="" />
        <h5 className="text-[10px] leading-4 text-white">Novice</h5>
      </div>
      <div className="bg-[#17181D] h-[70px] w-[70px] rounded-full flex flex-col items-center justify-center">
        <img src={hot} className="my-[2px]" alt="" />
      </div>
      <div className="bg-[#17181D] h-[70px] w-[70px] rounded-full flex flex-col items-center justify-center">
        <img src={moreIcon} className="my-[2px]" alt="" />
      </div>
    </div>
  );
}
