import { useOutletContext } from "react-router-dom";
import { Contract, num, RPC, RpcProvider } from "starknet";
import gameAbi from "../utils/gameAbi.json";
import { useState } from "react";

interface OutletContextType {
    account: any | null;
    handleConnectButton: () => void;
    handleClearSessionButton: () => void;
    isConnected: boolean;
    playerDetails: {};
    playerClassicGames: [];
}
const GAME_ADDRESS =
    "0x974d27dbf588cd1a581722921906d03b552d64107264d599e06c97b28e848e";
const PROVIDER = new RpcProvider({
    nodeUrl:
        "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/xZih3RhtucH0P0PvbFte29FfJzMmJ5E6",
});
const useGameLogic = () => {
    const { account } = useOutletContext<OutletContextType>();
    const [playerClassicGames, setPlayerClassicGames] = useState([]);
    const [playerDetails, setPlayerDetails] = useState([]);

    // const createNewClassicGame = async () => {
    //     const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);

    //     try {
    //         if (!account) {
    //             return;
    //         }
    //         console.log("starting/..............");
    //         const _gameCreated = await gameContract.create_new_classic_game();
    //         console.log("GAME CREATED_______---------", _gameCreated);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const fetchUserClassicGames = async () => {
        if (!account) return;
        const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);

        try {
            if (!account) {
                return;
            }
            const _playerClassicGames =
                await gameContract.get_player_classic_games(account.address);
            console.log(
                "Players classic games are ====+++++?>>>>>",
                _playerClassicGames
            );
            setPlayerClassicGames(_playerClassicGames);
            return _playerClassicGames;
        } catch (err) {
            console.log(err);
            return [];
        }
    };
    const fetchPlayerDetails = async (address: string) => {
        if (!account) return;
        const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);

        try {
            if (!account) {
                return;
            }
            const _playerDetails = await gameContract.get_player_details(
                address
            );
            // alert("player details is ___" + _playerDetails.game_count);
            console.log("player details is ___", _playerDetails);
            setPlayerDetails(_playerDetails);
            return _playerDetails;
        } catch (err) {
            console.log(err);
            return;
        }
    };
    const fetchClassicGameDetails = async (_gameId: number) => {
        if (!account) return;
        const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);

        try {
            if (!account) {
                return;
            }
            const _playerClassicGameDetails =
                await gameContract.get_player_classic_game(
                    account.address,
                    _gameId
                );
            console.log(
                "CLASSIC GAME DETAIL IS ==============>>>>>",
                _playerClassicGameDetails
            );
            return _playerClassicGameDetails;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    const createNewClassicGame = async () => {
        if (!account) return;
        const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);
        try {
            const myCall = gameContract.populate("create_new_classic_game", []);

            const estimatedFee1 = await account.estimateInvokeFee([myCall], {
                version: 3,
            });
            const resourceBounds = {
                ...estimatedFee1.resourceBounds,
                l1_gas: {
                    ...estimatedFee1.resourceBounds.l1_gas,
                    max_amount: num.toHex(
                        BigInt(
                            parseInt(
                                estimatedFee1.resourceBounds.l1_gas.max_amount,
                                16
                            ) * 2
                        ) // Double the estimated amount
                    ),
                },
            };
            const { transaction_hash } = await account.execute(myCall, {
                version: 3,
                maxFee: estimatedFee1.suggestedMaxFee,
                feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
                resourceBounds: resourceBounds,
            });

            console.log("transaction_hash", transaction_hash);
            let receipt = await PROVIDER.waitForTransaction(transaction_hash);
            console.log("receipt", receipt);
            return true;
        } catch (error) {}
    };

    return {
        fetchUserClassicGames,
        fetchClassicGameDetails,
        fetchPlayerDetails,
        playerDetails,
        playerClassicGames,
        createNewClassicGame,
    };
};

export default useGameLogic;
