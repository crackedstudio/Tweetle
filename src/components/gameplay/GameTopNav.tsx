import CoinPill from "../ui/CoinPill";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

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
        <div className="flex justify-between px-3 items-center py-3">
            <button
                className="flex items-center bg-[#C4C4C429] rounded-full text-white gap-x-1 py-2 px-3 text-xs"
                onClick={() => navigate(-1)}
            >
                <ChevronLeft size={13} /> Back
            </button>
            <CoinPill text={String(playerDetails?.points)} />
        </div>
    );
};

export default GameTopNav;
