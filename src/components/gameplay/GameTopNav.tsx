import CoinPill from "../ui/CoinPill";
// import calendar from "../../assets/bi_calendar-date-fill.png";
import right from "../../assets/right.png";
import { useOutletContext, useNavigate } from "react-router-dom";

interface GameData {
    points: number;
    // add other properties that might exist
}

interface OutletContextType {
    playerDetails: GameData;
}

const GameTopNav = () => {
    const { playerDetails } = useOutletContext<OutletContextType>();
    const navigate = useNavigate();

    return (
        <div className="flex justify-between px-3 items-center py-5">
            <div>
                <button
                    className="flex justify-center items-center w-[109px] h-[42px] bg-[#C4C4C429] rounded-[100px] text-white py-3 px-4"
                    onClick={() => navigate(-1)}
                >
                    <img
                        src={right}
                        alt="right"
                        className="inline rotate-180"
                    />{" "}
                    Back
                </button>
            </div>
            {/* <div>
                <img src={calendar} alt="" />
            </div> */}
            <div>
                <CoinPill text={String(playerDetails?.points)} />
            </div>
        </div>
    );
};

export default GameTopNav;
