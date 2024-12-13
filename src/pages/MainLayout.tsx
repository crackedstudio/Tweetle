import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

import { ArgentTMA, SessionAccountInterface } from "@argent/tma-wallet";
import { useEffect, useState } from "react";
import LoadingFullPage from "../components/pages/LoadingFullPage";

const argentTMA = ArgentTMA.init({
    environment: "sepolia", // "sepolia" | "mainnet" (not supperted yet)
    appName: "token_wordle", // Your Telegram app name
    appTelegramUrl: "https://t.me/Wordle_bot/Token_wordle", // Your Telegram app URL
    sessionParams: {
        allowedMethods: [
            // List of contracts/methods allowed to be called by the session key
            {
                contract:
                    "0x05167b1dec707de79e142938f443c7ad31652ffbf714fb824662213655e2680f",
                selector: "process_guess",
            },
        ],
        validityDays: 90, // session validity (in days) - default: 90
    },
});

const MainLayout = () => {
    const [account, setAccount] = useState<
        SessionAccountInterface | undefined
    >();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

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
                // const { account, callbackData } = res;
                // The session account is returned and can be used to submit transactions
                setAccount(account);
                setIsConnected(true);
                // Custom data passed to the requestConnection() method is available here
                console.log("callback data:", callbackData);
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
    console.log("Current window location is -- ", window.location.href);
    return (
        <div className="flex flex-col h-[100vh] overflow-hidden text-white relative">
            <main className="flex-grow h-full overflow-auto">
                <Outlet
                    context={{
                        account,
                        handleClearSessionButton,
                        handleConnectButton,
                        isConnected,
                    }}
                />
            </main>
            {/* <BottomNav /> */}
        </div>
    );
};

export default MainLayout;
