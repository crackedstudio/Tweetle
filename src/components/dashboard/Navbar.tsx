import { useOutletContext } from "react-router-dom";
import ConnectWalletBtn from "../ui/ConnectWalletBtn";
import CoinPill from "../ui/CoinPill";
import useGameLogic from "../../hooks/useGameLogic";
import { useEffect, useState } from "react";

interface OutletContextType {
  handleConnectButton: () => void;
  handleClearSessionButton: () => void;
  isConnected: boolean;
  playerDetails: GameData;
}

interface GameData {
  points: number;
  // add other properties that might exist
}

const Navbar = () => {
  const {
    handleConnectButton,
    isConnected,
    handleClearSessionButton,
    playerDetails,
  } = useOutletContext<OutletContextType>();

  const { getUserBalance } = useGameLogic();

  const [userBalance, setUserBalance] = useState("0");
  function divideBy10To18(value: bigint) {
    const divisor = 10n ** 18n; // 10^18 as BigInt
    // Convert to number and round to 2 decimal places
    return Number((value * 100n) / divisor) / 100;
  }

  useEffect(() => {
    const fetchBal = async () => {
      let _bal = await getUserBalance();
      console.log("got balance is ---", _bal);
      if (!_bal) {
        setUserBalance("0.00 STRK");
      } else {
        _bal = divideBy10To18(_bal);
        setUserBalance(_bal.toFixed(2) + " STRK");
      }
    };
    fetchBal();
  }, []);

  return (
    <div className="relative">
      {/* Black mask overlay - positioned behind content */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

      {/* Content container - positioned above mask */}
      <div className="relative z-10 flex justify-between px-5 py-2">
        {!isConnected && (
          <ConnectWalletBtn
            text="Connect Wallet"
            connect={handleConnectButton}
          />
        )}
        {isConnected && (
          <ConnectWalletBtn
            text={userBalance}
            connect={handleClearSessionButton}
          />
        )}
        <CoinPill text={String(playerDetails?.points)} />
      </div>
    </div>
  );
};

export default Navbar;
