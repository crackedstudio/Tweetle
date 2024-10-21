import React from "react";
import ConnectButton from "../connect-button";
import CoinPill from "../coin-pill";

const GameTopNav = () => {
    return (
        <div className="flex justify-between px-3 items-center py-5">
            <div>
                <ConnectButton text="0x89008" />
            </div>
            <div>
                <img src="/assets/bi_calendar-date-fill.png" alt="" />
            </div>
            <div>
                <CoinPill text="78900" />
            </div>
        </div>
    );
};

export default GameTopNav;
