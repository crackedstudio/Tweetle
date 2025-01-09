import { useOutletContext } from "react-router-dom";
import { Contract } from "starknet";
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
    "0x014348d668e199e0222d2a58d80c04821b9dddb00c5946d1282d415a448227c9";
const useGameLogic = () => {
    const { account } = useOutletContext<OutletContextType>();
    const [playerClassicGames, setPlayerClassicGames] = useState([]);
    const [playerDetails, setPlayerDetails] = useState([]);

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
            return _playerClassicGameDetails;
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    return {
        fetchUserClassicGames,
        fetchClassicGameDetails,
        fetchPlayerDetails,
        playerDetails,
        playerClassicGames,
    };
};

export default useGameLogic;
