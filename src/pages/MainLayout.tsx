import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

import { ArgentTMA, SessionAccountInterface } from "@argent/tma-wallet";
import { useEffect, useState } from "react";
import LoadingFullPage from "../components/pages/LoadingFullPage";
import { Contract } from "starknet";
import gameAbi from "../utils/gameAbi.json";

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
                    "0x033ccdb04e78933097705e1847779f59db1c868f4da503c87d5a776854256fca",
                selector: "create_new_game",
            },
            {
                contract:
                    "0x033ccdb04e78933097705e1847779f59db1c868f4da503c87d5a776854256fca",
                selector: "save_player_guess",
            },
            {
                contract:
                    "0x033ccdb04e78933097705e1847779f59db1c868f4da503c87d5a776854256fca",
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

    const getPlayerDetails = async (account: any) => {
        if (!account) return;
        const game_addr =
            "0x033ccdb04e78933097705e1847779f59db1c868f4da503c87d5a776854256fca";
        const gameContract = new Contract(gameAbi, game_addr, account);

        try {
            if (!account) {
                return;
            }
            const _playerDetails = await gameContract.get_player_details(
                account.address
            );
            // alert("player details is ___" + _playerDetails.game_count);
            console.log("player details is ___", _playerDetails);
            return _playerDetails;
        } catch (err) {
            console.log(err);
            return;
        }
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

        const fetchPlayerDetails = async () => {
            try {
                const _playerDetails = await getPlayerDetails(account);
                setPlayerDetails(_playerDetails);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };
        fetchPlayerDetails();
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
                    }}
                />
            </main>
            {/* {!isOnPlayOrShuffle && <BottomNav />} */}
            <BottomNav />
        </div>
    );
};

export default MainLayout;
