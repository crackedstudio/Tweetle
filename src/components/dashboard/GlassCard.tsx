// import hot from "../../assets/svg/hot.svg";
// import joystick from "../../assets/svg/joystick.svg";

import { ReactElement } from "react";

interface GlassCardProps {
  children: ReactElement;
}

export default function GlassCard({ children }: GlassCardProps) {
  return (
    <div className="px-5 flex flex-col gap-y-4">
      {/* <div className="flex justify-between items-center mb-[18px]">
                <h4>Today&apos;s Daily Challenge</h4>
                <img src={hot} className="w-5 h-5" alt="" />
            </div>
            <p className="text-sm leading-5 my-[18px]">
                Think you&apos;ve got what it takes? Solve today&apos;s puzzle
                and earn the max reward of{" "}
                <span className="font-extrabold text-[#FE97D5]">
                    50 points!
                </span>{" "}
                Put your word skills to the test and climb the leaderboard with
                each victory
            </p>
            <a
                className="flex items-center justify-center gap-x-2 py-[9px] w-[142px] bg-[#4F5285] text-base leading-5 font-medium mx-auto"
                href="/play"
            >
                <img src={joystick} alt="" />
                Play
            </a> */}
      {children}
    </div>
  );
}
