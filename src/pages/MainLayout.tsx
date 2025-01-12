import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

import { ArgentTMA, SessionAccountInterface } from "@argent/tma-wallet";
import { useEffect, useState } from "react";
import LoadingFullPage from "../components/pages/LoadingFullPage";
import { CallData } from "starknet";
// import useGameLogic from "../hooks/useGameLogic";
// import { CallData, Contract } from "starknet";
// import gameAbi from "../utils/gameAbi.json";
// import useGameLogic from "../hooks/useGameLogic";

interface ArgumentArgentTMA {
    callbackData?: string | undefined;
    approvalRequests?: string[] | undefined;
}

const argentTMA = ArgentTMA.init({
    environment: "sepolia", // "sepolia" | "mainnet" (not supperted yet)
    appName: "burnout", // Your Telegram app name
    appTelegramUrl: "https://t.me/crankyBot/burnout", // Your Telegram app URL
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
                    "0x974d27dbf588cd1a581722921906d03b552d64107264d599e06c97b28e848e",
                selector: "create_new_classic_game",
            },
            {
                contract:
                    "0x974d27dbf588cd1a581722921906d03b552d64107264d599e06c97b28e848e",
                selector: "save_player_guess",
            },
            {
                contract:
                    "0x974d27dbf588cd1a581722921906d03b552d64107264d599e06c97b28e848e",
                selector: "register_player",
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
    const [playerClassicGames, setPlayerClassicGames] = useState<any>([]);
    const [playerClassicGameCount, setPlayerClassicGameCount] = useState(0);
    const [currentGameIndex, setCurrentGameIndex] = useState<number>();

    const updatePlayerDetails = (item: {}) => {
        setPlayerDetails(item);
    };
    const updatePlayerClassicGames = (item: []) => {
        setPlayerClassicGames(item);
    };
    const updatePlayerClassicGameCount = (count: number) => {
        setPlayerClassicGameCount(count);
    };
    const updateCurrentGameIndex = (index: number) => {
        setCurrentGameIndex(index);
    };

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
                const { account } = res;
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

    const argumentArgentTMA: ArgumentArgentTMA = {
        callbackData: "custom_callback_data",
        approvalRequests: [],
    };
    const handleConnectButton = async () => {
        // @ts-ignore
        await argentTMA.requestConnection(argumentArgentTMA.callbackData);
    };

    // useful for debugging
    const handleClearSessionButton = async () => {
        await argentTMA.clearSession();
        setAccount(undefined);
    };

    const handleRegisterPlayer = async () => {
        console.log(account?.getDeploymentPayload());
    };

    const handleOutsideExecution = async () => {
        let calls = [
            {
                contractAddress:
                    "0x974d27dbf588cd1a581722921906d03b552d64107264d599e06c97b28e848e",
                entrypoint: "register_player",
                calldata: CallData.compile({
                    _tg_id: "123567",
                }),
            },
        ];

        console.log("sent");

        let call = await account?.getOutsideExecutionPayload({ calls });

        console.log(call);

        const response = await fetch(
            "https://tweetle-bot-backend.onrender.com/player/execute-outside",
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(call),
            }
        );

        console.log("fetch");

        let result = await response.json();

        console.log(result);
    };

    if (isLoading) {
        return <LoadingFullPage />;
    }
    // console.log("Current window location is -- ", window.location.href);
    // const isOnPlayOrShuffle = regex.test(window.location.href);
    // const { fetchPlayerDetails } = useGameLogic();
    // useEffect(() => {
    //     if (!account) return;
    //     fetchPlayerDetails(account);
    // }, [account]);

    return (
        <div className="flex flex-col h-[100vh] overflow-hidden text-white relative">
            <main className="flex-grow h-full overflow-auto">
                <div className="flex flex-col">
                    <button onClick={handleRegisterPlayer}>Register</button>
                    <button onClick={handleOutsideExecution}>
                        execute_calls
                    </button>
                </div>
                <Outlet
                    context={{
                        account,
                        handleClearSessionButton,
                        handleConnectButton,
                        updatePlayerDetails,
                        updatePlayerClassicGames,
                        updatePlayerClassicGameCount,
                        updateCurrentGameIndex,
                        isConnected,
                        playerDetails,
                        playerClassicGames,
                        playerClassicGameCount,
                        currentGameIndex,
                    }}
                />
            </main>
            {/* {!isOnPlayOrShuffle && <BottomNav />} */}
            <BottomNav />
        </div>
    );
};

export default MainLayout;
