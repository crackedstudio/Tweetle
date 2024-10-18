import React from "react";

function LetterBox({ letter }: { letter: string }) {
  return (
    <div className="w-[45px] shadow-letterShadow rounded-[3px] font-bold text-[30px] leading-9 h-[45px] flex items-center justify-center text-center bg-[#EB69B7]">
      {letter.toUpperCase()}
    </div>
  );
}

export default function GameTitle() {
  return (
    <div className="flex flex-col gap-y-[18.6px]">
      <div className="flex justify-center items-center gap-x-[15px]">
        {"TOKEN".split("").map((letter, i) => (
          <LetterBox letter={letter} key={i} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-x-[15px]">
        {"WORDLE".split("").map((letter, i) => (
          <LetterBox letter={letter} key={i} />
        ))}
      </div>
    </div>
  );
}
