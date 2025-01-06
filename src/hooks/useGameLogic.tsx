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
}
const GAME_ADDRESS =
    "0x6726494f5ced7684652a23fac3754338f0ef3f399e7bd004d57c9a4a7ca9ba1";
const useGameLogic = () => {
    const { account } = useOutletContext<OutletContextType>();
    const [playerGames, setPlayerGames] = useState([]);

    const fetchAllUserGames = async () => {
        if (!account) return;
        const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);

        try {
            if (!account) {
                return;
            }
            const _playerGames = await gameContract.get_player_games(
                account.address
            );
            setPlayerGames(_playerGames);
            return _playerGames;
        } catch (err) {
            console.log(err);
            return [];
        }
    };
    const fetchGameDetails = async (_gameId: number) => {
        if (!account) return;
        const gameContract = new Contract(gameAbi, GAME_ADDRESS, account);

        try {
            if (!account) {
                return;
            }
            const _playerGames = await gameContract.get_player_game(
                account.address,
                _gameId
            );
            setPlayerGames(_playerGames);
            return _playerGames;
        } catch (err) {
            console.log(err);
            return [];
        }
    };
    return { fetchAllUserGames, playerGames, fetchGameDetails };
};

export default useGameLogic;
