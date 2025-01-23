import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

import { ArgentTMA, SessionAccountInterface } from "@argent/tma-wallet";
import { useEffect, useState } from "react";
import LoadingFullPage from "../components/pages/LoadingFullPage";
import { CallData } from "starknet";
import FullPageConnect from "../components/pages/FullPageConnect";
// import useGameLogic from "../hooks/useGameLogic";
// import { CallData, Contract } from "starknet";
// import gameAbi from "../utils/gameAbi.json";
// import useGameLogic from "../hooks/useGameLogic";

import { Bounce, ToastContainer } from "react-toastify";
// import useGameLogic from "../hooks/useGameLogic";

interface ArgumentArgentTMA {
    callbackData?: string | undefined;
    approvalRequests?: string[] | undefined;
}

const argentTMA = ArgentTMA.init({
    environment: "sepolia", // "sepolia" | "mainnet" (not supperted yet)
    appName: "tweetle", // Your Telegram app name
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
            {
                contract:
                    "0x974d27dbf588cd1a581722921906d03b552d64107264d599e06c97b28e848e",
                selector: "save_Player_classic_attempt",
            },
            {
                contract:
                    "0x974d27dbf588cd1a581722921906d03b552d64107264d599e06c97b28e848e",
                selector: "save_player_daily_attempt",
            },
            {
                contract:
                    "0x974d27dbf588cd1a581722921906d03b552d64107264d599e06c97b28e848e",
                selector: "claim_points",
            },
            {
                contract:
                    "0x974d27dbf588cd1a581722921906d03b552d64107264d599e06c97b28e848e",
                selector: "join_daily_game",
            },
        ],
        validityDays: 90, // session validity (in days) - default: 90
    },
});
// const regex = /\/(play|classic)/;
// interface ClassicGameAttempts {
//     word: string;
// }
const MainLayout = () => {
    const [account, setAccount] = useState<
        SessionAccountInterface | undefined
    >();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [playerDetails, setPlayerDetails] = useState({});
    const [playerClassicGames, setPlayerClassicGames] = useState<any>([]);
    const [playerClassicGameCount, setPlayerClassicGameCount] = useState(0);
    const [isAccountDeployed, setIsAccountDeployed] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);

    const updatePlayerDetails = (item: {}) => {
        setPlayerDetails(item);
    };
    const updatePlayerClassicGames = (item: []) => {
        setPlayerClassicGames(item);
    };
    const updatePlayerClassicGameCount = (count: number) => {
        setPlayerClassicGameCount(count);
    };
    const updateShowJoinModal = (state: boolean) => {
        setShowJoinModal(state);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        // Cleanup the timeout if the component unmounts before the timeout is done
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const checkDeployStatus = async () => {
            const _isAccountDeployed = await account?.isDeployed();
            console.log("IS ACCOUNT DEPLOYED _----", _isAccountDeployed);
            if (typeof _isAccountDeployed === "boolean")
                setIsAccountDeployed(_isAccountDeployed);
            if (_isAccountDeployed === false) {
                setShowJoinModal(true);
            }
        };
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
                    checkDeployStatus();
                    return;
                }
                // Connected
                // const { account, callbackData } = res;git
                // The session account is returned and can be used to submit transactions
                setAccount(account);
                setIsConnected(true);
                // console.log("Step2.5");
                // deployAccountAction();
                // Custom data passed to the requestConnection() method is available here
                // console.log("callback data:", callbackData);

                // if user is connected , check if account is deployed , if it isnt deploy account for user
            })
            .catch((err) => {
                console.error("Failed to connect", err);
            });

        checkDeployStatus();
    }, []);

    // const deployAccountAction = async () => {
    //     console.log("Step 1");
    //     if (!isConnected) return;
    //     const _isAccountDeployed = await account?.isDeployed();
    //     setIsAccountDeployed(true);
    //     console.log("is Account deployed????", _isAccountDeployed);
    //     if (_isAccountDeployed) return;
    //     console.log("is Account deployed????", _isAccountDeployed);
    //     const _deployedSuccessfully = await handleAccountDeployment();
    //     console.log("has account been deployed ? ===>>", _deployedSuccessfully);
    // };

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

    // const handleRegisterPlayer = async () => {
    //     console.log(
    //         "is account deployed====>>>>>>",
    //         await account?.isDeployed()
    //     );
    //     console.log(await account?.getDeploymentPayload());
    // };

    // const handleAccountDeployment = async () => {
    //     try {
    //         const _deploymentPayload = await account?.getDeploymentPayload();

    //         const response = await fetch(
    //             "https://tweetle-bot-backend.onrender.com/player/deploy-account",
    //             {
    //                 headers: {
    //                     Accept: "application/json",
    //                     "Content-Type": "application/json",
    //                 },
    //                 method: "POST",
    //                 body: JSON.stringify(_deploymentPayload),
    //             }
    //         );

    //         console.log("fetch");
    //         let result = await response.json();

    //         console.log(result);

    //         const _deployCall = await account?.deployAccount(
    //             _deploymentPayload
    //         );
    //         console.log("deploy call returned ===>>>>>>>>", _deployCall);

    //         return await account?.isDeployed();
    //     } catch (err) {
    //         console.log("error deploying account ===>>>>", err);
    //         return await account?.isDeployed();
    //     }
    // };

    // const registerUser = async () => {
    //     if (!account) return;
    //     const _isAccountDeployed = await account?.isDeployed();
    //     if (_isAccountDeployed) return;
    //     const _playerDetails = await fetchPlayerDetails(account?.address);
    //     const _isPlayerRegistered = _playerDetails?.is_registered;
    //     if (_isPlayerRegistered) return;
    //     const _registeredSuccessfully = await handleOutsideExecution();
    //     console.log("DID USER REGISTER SUCCESSFULLY", _registeredSuccessfully);
    // };

    const handleOutsideExecution = async () => {
        let tg_id = localStorage.getItem("tg_id");

        if (tg_id == "") {
            return;
        }

        let calls = [
            {
                contractAddress:
                    "0x974d27dbf588cd1a581722921906d03b552d64107264d599e06c97b28e848e",
                entrypoint: "register_player",
                calldata: CallData.compile({
                    _tg_id: tg_id ? tg_id : 0,
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

    const deployAccount = async () => {
        const _deploymentPayload = await account?.getDeploymentPayload();

        const estimateAmt = await account?.estimateAccountDeployFee(
            _deploymentPayload
        );

        console.log(_deploymentPayload, estimateAmt);

        const response = await fetch(
            "https://tweetle-bot-backend.onrender.com/player/deploy-account",
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(_deploymentPayload),
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
    if (!isConnected) {
        return <FullPageConnect handler={handleConnectButton} />;
    }

    return (
        <div className="flex flex-col h-[100vh] overflow-hidden text-white relative">
            <main className="flex-grow h-full overflow-auto">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}
                />

                <Outlet
                    context={{
                        account,
                        handleClearSessionButton,
                        handleConnectButton,
                        updatePlayerDetails,
                        updatePlayerClassicGames,
                        updatePlayerClassicGameCount,
                        updateShowJoinModal,
                        deployAccount,
                        isConnected,
                        isAccountDeployed,
                        playerDetails,
                        playerClassicGames,
                        playerClassicGameCount,
                        showJoinModal,
                        handleOutsideExecution,
                        setIsAccountDeployed,
                    }}
                />
            </main>
            {/* {!isOnPlayOrShuffle && <BottomNav />} */}
            <BottomNav />
        </div>
    );
};

export default MainLayout;
