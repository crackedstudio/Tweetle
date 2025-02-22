import { Outlet, useLocation } from "react-router-dom";
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

import { Bounce, toast, ToastContainer } from "react-toastify";
// import useGameLogic from "../hooks/useGameLogic";

interface ArgumentArgentTMA {
    callbackData?: string | undefined;
    approvalRequests?: string[] | undefined;
}

const argentTMA = ArgentTMA.init({
    environment: "mainnet", // "sepolia" | "mainnet" (not supperted yet)
    appName: "Tweetle", // Your Telegram app name
    appTelegramUrl: "https://t.me/Tweetle_bot/Tweetle", // Your Telegram app URL
    // appTelegramUrl: "https://t.me/OtaikiTestBot/fishytweetle", // Your Telegram app URL
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
                    "0x065a247553dbb49922ee472cd27baa26897a9b00b02513997cd2832b1adc99b2",
                selector: "create_new_classic_game",
            },
            {
                contract:
                    "0x065a247553dbb49922ee472cd27baa26897a9b00b02513997cd2832b1adc99b2",
                selector: "save_player_guess",
            },
            {
                contract:
                    "0x065a247553dbb49922ee472cd27baa26897a9b00b02513997cd2832b1adc99b2",
                selector: "register_player",
            },
            {
                contract:
                    "0x065a247553dbb49922ee472cd27baa26897a9b00b02513997cd2832b1adc99b2",
                selector: "save_Player_classic_attempt",
            },
            {
                contract:
                    "0x065a247553dbb49922ee472cd27baa26897a9b00b02513997cd2832b1adc99b2",
                selector: "save_player_daily_attempt",
            },
            {
                contract:
                    "0x065a247553dbb49922ee472cd27baa26897a9b00b02513997cd2832b1adc99b2",
                selector: "claim_points",
            },
            {
                contract:
                    "0x065a247553dbb49922ee472cd27baa26897a9b00b02513997cd2832b1adc99b2",
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
    const [allPlayers, setAllPlayers] = useState<{}>([]);
    const [playerClassicGameCount, setPlayerClassicGameCount] = useState(0);
    const [isAccountDeployed, setIsAccountDeployed] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [walletConnectLoading, setWalletConnectLoading] = useState(false);

    const callToast = (msg: string) => {
        return toast(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };

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

    const updateAllPlayers = (_players: []) => {
        setAllPlayers(_players);
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
                    setIsConnected(false);
                    return;
                }

                const { account } = res;
                if (account.getSessionStatus() !== "VALID") {
                    setAccount(account);
                    setIsConnected(false);
                    return;
                }

                // Set account and connection status first
                setAccount(account);
                setIsConnected(true);

                // Then check deployment status
                // checkDeployStatus();
            })
            .catch((err) => {
                callToast("Failed to connect to wallet ❗❗❗, Try again 🔁");
                console.error("Failed to connect", err);
            });
    }, []); // Remove checkDeployStatus() from here

    // Add a separate useEffect to monitor account changes
    // useEffect(() => {
    //     if (account && isConnected) {
    //         const checkStatus = async () => {
    //             try {
    //                 const _playerDetails = await fetchPlayerDetails(
    //                     account?.address
    //                 );
    //                 const _isPlayerRegistered = _playerDetails?.is_registered;
    //                 console.log(
    //                     "IS Player registered _----",
    //                     _isPlayerRegistered
    //                 );
    //                 setIsAccountDeployed(_isPlayerRegistered);
    //                 setShowJoinModal(!_isPlayerRegistered);
    //             } catch (error) {
    //                 console.error("Error checking deployment status:", error);
    //             }
    //         };

    //         checkStatus();
    //     }
    // }, [account, isConnected]);

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
        setWalletConnectLoading(true);
        // @ts-ignore
        await argentTMA.requestConnection(argumentArgentTMA.callbackData);
        setWalletConnectLoading(false);
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
                    "0x065a247553dbb49922ee472cd27baa26897a9b00b02513997cd2832b1adc99b2",
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
        try {
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
            return;
        } catch {
            callToast("Failed to deploy account ❗❗❗, Try again 🔁");
        }
    };

    const location = useLocation(); // Add this hook
    const showBottomNav = !(location.pathname === "/play"); // Add this condition

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
        return (
            <FullPageConnect
                handler={handleConnectButton}
                isLoading={walletConnectLoading}
            />
        );
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
                        updateAllPlayers,
                        deployAccount,
                        isConnected,
                        isAccountDeployed,
                        playerDetails,
                        playerClassicGames,
                        playerClassicGameCount,
                        allPlayers,
                        showJoinModal,
                        handleOutsideExecution,
                        setIsAccountDeployed,
                    }}
                />
            </main>
            {showBottomNav && <BottomNav />}
            {/* <BottomNav /> */}
        </div>
    );
};

export default MainLayout;
