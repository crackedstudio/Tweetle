import React from "react";
import ConnectButton from "./connect-button";

export default function HomeHeroSection() {
    return (
        <div className="py-6 pt-[40px] flex flex-col items-center bg-gradient-svg">
            <ConnectButton />
            <img src="/assets/reading-owl.png" className="mb-2 w-[80px]" />
            <h1 className="mb-4 font-bold text-[28px] leading-5">
                Birdle Challenge
            </h1>
            <h3 className="text-lg leading-5 font-medium text-[#F5F5F6B2] mb-4">
                Solve. Score. Win Rewards.
            </h3>

            <button className="flex items-center gap-x-2 p-[10px] bg-[#C4C4C429] font-extrabold rounded-full text-base leading-5">
                <img src="/assets/coin.svg" alt="" className="w-6" />
                Your Chirps
            </button>
        </div>
    );
}
