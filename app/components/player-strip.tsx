import React from "react";

export default function PlayerStrip({
  player,
  showPosition = true,
}: {
  player: {
    name: string;
    points: string;
    abbreviation: string;
    position: number;
  };
  showPosition?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-stretch gap-x-2">
        <div className="w-10 h-10 bg-[#6AAA64] text-center flex items-center justify-center">
          {player.abbreviation}
        </div>
        <div className="flex flex-col gap-y- text-sm leading-[15px] font-medium">
          <h3 className="text-white font-bold">{player.name}</h3>
          <h4 className="text-[#F5F5F5B2]">{player.points} Points</h4>
        </div>
      </div>
      {showPosition && player.position === 1 && (
        <img src="/assets/firstplace-medal.svg" alt="" />
      )}
      {showPosition && player.position === 2 && (
        <img src="/assets/secondplace-medal.svg" alt="" />
      )}
      {showPosition && player.position === 3 && (
        <img src="/assets/thirdplace-medal.svg" alt="" />
      )}
      {showPosition && player.position > 3 && (
        <h3 className="text-base leading-[15px] font-bold text-white">
          #{player.position}
        </h3>
      )}
    </div>
  );
}
