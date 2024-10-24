import readingOwl from "../../assets/reading-owl.png";
import CoinPill from "../ui/CoinPill";
import ConnectWalletBtn from "../ui/ConnectWalletBtn";

export default function HomeHeroSection() {
    return (
        <div className="py-6 pt-[40px] flex flex-col items-center bg-gradient-svg">
            <ConnectWalletBtn text="Connect Wallet" />
            <img src={readingOwl} className="mb-2 w-[80px]" />
            <h1 className="mb-4 font-bold text-[28px] leading-5">
                Birdle Challenge
            </h1>
            <h3 className="text-lg leading-5 font-medium text-[#F5F5F6B2] mb-4">
                Solve. Score. Win Rewards.
            </h3>

            <CoinPill text="Your Chirps" />
        </div>
    );
}
