import React from "react";
import LetterBox from "./letter-box";
import PoweredBy from "./powered-by";

export default function LoadingFullPage() {
    return (
        <div className="absolute inset-0 flex flex-col px-5 items-center text-white z-[200] pt-[66px] bg-gradient-svg">
            <img src="/assets/reading-owl.png" alt="" />
            <div className="flex justify-center gap-x-[15px] mt-[-29px] mb-6">
                {"TWEETLE".split("").map((letter, i) => (
                    <LetterBox
                        letter={letter}
                        key={i}
                        className="!w-[35px] !h-[35px] !text-[24px] !leading-[30px]"
                    />
                ))}
            </div>
            <h4 className="font-semibold text-lg leading-5 text-[#F5F5F6B2]">
                Solve. Score. Win Rewards
            </h4>

            <div className="flex items-center mt-6">
                <img
                    src="/assets/coin.svg"
                    className="animate-rotateX h-6 w-6"
                    alt=""
                />
            </div>

            <div className="absolute bottom-7 text-center">
                <PoweredBy />
            </div>
        </div>
    );
}
