import readingOwl from "../../assets/reading-owl.png";

import Navbar from "./Navbar";

export default function HomeHeroSection() {
    return (
        <>
            <Navbar />
            <div className="pb-2 flex flex-col items-center">
                <img src={readingOwl} className="mb-2 w-[80px]" />
                <h1 className="mb-2 font-bold text-[28px] leading-5">
                    Birdle Challenge
                </h1>
                <h3 className="text-lg leading-5 font-medium text-[#F5F5F6B2] mb-2">
                    Solve. Score. Win Rewards.
                </h3>
            </div>
        </>
    );
}
