import { useOutletContext } from "react-router-dom";
import readingOwl from "../../assets/reading-owl.png";
// import CoinPill from "../ui/CoinPill";
import ConnectWalletBtn from "../ui/ConnectWalletBtn";

interface OutletContextType {
    account: any | null;
    handleConnectButton: () => void;
    handleClearSessionButton: () => void;
    isConnected: boolean;
}

export default function HomeHeroSection() {
    const {
        account,
        handleConnectButton,
        isConnected,
        handleClearSessionButton,
    } = useOutletContext<OutletContextType>();

    return (
        <div className="py-2 pt-[40px] flex flex-col items-center bg-gradient-svg">
            {!isConnected && (
                <ConnectWalletBtn
                    text="Connect Wallet"
                    connect={handleConnectButton}
                />
            )}
            {isConnected && (
                <ConnectWalletBtn
                    text={account?.address.slice(0, 6)}
                    connect={handleClearSessionButton}
                />
            )}
            <img src={readingOwl} className="mb-2 w-[80px]" />
            <h1 className="mb-2 font-bold text-[28px] leading-5">
                Birdle Challenge
            </h1>
            <h3 className="text-lg leading-5 font-medium text-[#F5F5F6B2] mb-2">
                Solve. Score. Win Rewards.
            </h3>

            {/* <CoinPill text="Your Chirps" /> */}
        </div>
    );
}
