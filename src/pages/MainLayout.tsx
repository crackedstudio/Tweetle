import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

import { ArgentTMA, SessionAccountInterface } from "@argent/tma-wallet";
import { useEffect, useState } from "react";
import LoadingFullPage from "../components/pages/LoadingFullPage";
import { Contract } from "starknet";
import gameAbi from "../utils/gameAbi.json";
import useGameLogic from "../hooks/useGameLogic";

const argentTMA = ArgentTMA.init({
    environment: "sepolia", // "sepolia" | "mainnet" (not supperted yet)
    appName: "token_wordle", // Your Telegram app name
    appTelegramUrl: "https://t.me/Wordle_bot/Token_wordle", // Your Telegram app URL
    sessionParams: {
        allowedMethods: [
            // List of contracts/methods allowed to be called by the session key
            {
                contract:
                    "0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f",
                selector: "request_random",
            },
            {
                contract:
                    "0x6726494f5ced7684652a23fac3754338f0ef3f399e7bd004d57c9a4a7ca9ba1",
                selector: "create_new_game",
            },
            {
                contract:
                    "0x6726494f5ced7684652a23fac3754338f0ef3f399e7bd004d57c9a4a7ca9ba1",
                selector: "save_player_guess",
            },
            {
                contract:
                    "0x6726494f5ced7684652a23fac3754338f0ef3f399e7bd004d57c9a4a7ca9ba1",
                selector: "get_player_games",
            },
        ],
        validityDays: 90, // session validity (in days) - default: 90
    },
});
// const regex = /\/(play|classic)/;

const MainLayout = () => {
    const [account, setAccount] = useState<
        SessionAccountInterface | undefined
    >();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [playerDetails, setPlayerDetails] = useState({});
    const [playerGameCount, setPlayerGameCount] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        // Cleanup the timeout if the component unmounts before the timeout is done
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        argentTMA
            .connect()
            .then((res) => {
                if (!res) {
                    // Not connected
                    setIsConnected(false);
                    return;
                }

                // Connected
                const { account, callbackData } = res;

                if (account.getSessionStatus() !== "VALID") {
                    const { account } = res;

                    setAccount(account);
                    setIsConnected(false);
                    return;
                }

                // Connected
                // const { account, callbackData } = res;git
                // The session account is returned and can be used to submit transactions
                setAccount(account);
                setIsConnected(true);
                // Custom data passed to the requestConnection() method is available here
                // console.log("callback data:", callbackData);
            })
            .catch((err) => {
                console.error("Failed to connect", err);
            });
    }, [account]);

    const handleConnectButton = async () => {
        await argentTMA.requestConnection("custom_callback_data");
    };

    // useful for debugging
    const handleClearSessionButton = async () => {
        await argentTMA.clearSession();
        setAccount(undefined);
    };

    if (isLoading) {
        return <LoadingFullPage />;
    }
    // console.log("Current window location is -- ", window.location.href);
    // const isOnPlayOrShuffle = regex.test(window.location.href);

    return (
        <div className="flex flex-col h-[100vh] overflow-hidden text-white relative">
            <main className="flex-grow h-full overflow-auto">
                <Outlet
                    context={{
                        account,
                        handleClearSessionButton,
                        handleConnectButton,
                        isConnected,
                        playerDetails,
                        playerGameCount,
                    }}
                />
            </main>
            {/* {!isOnPlayOrShuffle && <BottomNav />} */}
            <BottomNav />
        </div>
    );
};

export default MainLayout;
