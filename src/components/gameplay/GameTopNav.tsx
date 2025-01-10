import CoinPill from "../ui/CoinPill";
import calendar from "../../assets/bi_calendar-date-fill.png";
import right from "../../assets/right.png";
import { useOutletContext } from "react-router-dom";
interface GameData {
    points: number;
    // add other properties that might exist
}
interface OutletContextType {
    playerDetails: GameData;
}

const GameTopNav = () => {
    const { playerDetails } = useOutletContext<OutletContextType>();

    return (
        <div className="flex justify-between px-3 items-center py-5">
            <div>
                {/* {isConnected && <ConnectWalletBtn text={account?.address.slice(0, 6)} connect={handleClearSessionButton} />} */}
                <a
                    className="w-[109px] h-[42px] bg-[#C4C4C429] rounded-[100px] text-white py-3 px-4"
                    href="/"
                >
                    <img
                        src={right}
                        alt="right"
                        className="inline rotate-180"
                    />{" "}
                    Back
                </a>
            </div>
            <div>
                <img src={calendar} alt="" />
            </div>
            <div>
                <CoinPill text={String(playerDetails?.points)} />
            </div>
        </div>
    );
};

export default GameTopNav;
