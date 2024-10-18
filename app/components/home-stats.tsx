import React from "react";

export default function HomeStats() {
  return (
    <div className="flex justify-center gap-x-6 items-center">
      <div className="bg-[#17181D] h-[90px] w-[90px] rounded-full flex flex-col items-center justify-center">
        <h6 className="text-[10px] leading-4 text-[#F5F5F599]">Level</h6>
        <img src="/assets/egg.svg" className="my-[2px]" alt="" />
        <h5 className="text-[10px] leading-4 text-white">Novice</h5>
      </div>
      <div className="bg-[#17181D] h-[90px] w-[90px] rounded-full flex flex-col items-center justify-center">
        <img src="/assets/hot.svg" className="my-[2px]" alt="" />
      </div>
      <div className="bg-[#17181D] h-[90px] w-[90px] rounded-full flex flex-col items-center justify-center">
        <img src="/assets/moreIcon.svg" className="my-[2px]" alt="" />
      </div>
    </div>
  );
}
