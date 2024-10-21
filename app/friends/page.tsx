"use client";
import PlayerStrip from "../components/player-strip";
import { dummyPlayers } from "../utils/data";

export default function Page() {
  return (
    <div>
      <div className="pt-[40px] pb-6 flex flex-col items-center bg-[#45678f]">
        <img src="/assets/reading-owl.png" className="w-[90px]" alt="" />
        <h1 className="text-[28px] leading-5 font-bold mb-4">
          Your Nest is empty
        </h1>
        <h4 className="text-[18px] leading-5 font-medium text-[#F5F5F6B2]">
          Invite friends and earn rewards
        </h4>
      </div>
      <div
        className={`${
          dummyPlayers.length > 0 ? "" : "pt-[200px]"
        } bg-black flex flex-col h-screen`}
      >
        <div className="py-[37px] px-[24px] bg-[#0A0B0F]">
          <button className="py-[14px] bg-[#F5F5F5] rounded-[12px] w-full text-[15px] leading-5 font-medium text-black">
            Invite a Friend
          </button>
        </div>
        {dummyPlayers.length > 0 && (
          <div className="flex flex-col gap-y-6 p-6">
            {dummyPlayers
              .map((player, i) => {
                return { ...player, position: i + 1 };
              })
              .map((player) => (
                <PlayerStrip player={player} showPosition={false} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
