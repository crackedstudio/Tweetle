import React from "react";
import ConnectWalletBtn from "../ui/ConnectWalletBtn";
import CoinPill from "../ui/CoinPill";
import calendar from "../../assets/bi_calendar-date-fill.png";

const GameTopNav = () => {
    return (
        <div className="flex justify-between px-3 items-center py-5">
            <div>
                <ConnectWalletBtn text="0x89008" />
            </div>
            <div>
                <img src={calendar} alt="" />
            </div>
            <div>
                <CoinPill text="78900" />
            </div>
        </div>
    );
};

export default GameTopNav;
