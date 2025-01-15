import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { readFromBlockchain, writeToBlockchain } from "../utils/helper";
import gameAbi from "../utils/gameAbi.json";
// import { readFromBlockchain } from "../utils/blockchainUtils";

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

const useGameLogic = () => {
  const { account } = useOutletContext<OutletContextType>();
  const [playerClassicGames, setPlayerClassicGames] = useState([]);
  const [playerDetails, setPlayerDetails] = useState([]);

  const fetchUserClassicGames = async () => {
    const response = await readFromBlockchain(
      "get_player_classic_games",
      account,
      GAME_ADDRESS,
      [account.address]
    );
    if (response) setPlayerClassicGames(response);
    return response;
  };

  const fetchUserDailyGame = async () => {
    const response = await readFromBlockchain(
      "get_daily_game",
      GAME_ADDRESS,
      account
    );
    console.log("User daily game:", response);
    return response;
  };

  const fetchDailyGameId = async () => {
    const dailyGameId = await readFromBlockchain(
      "get_daily_game_id",
      GAME_ADDRESS,
      account
    );
    console.log("Daily game ID is ====+++++?>>>>>", dailyGameId);
    return dailyGameId;
  };

  const fetchPlayerDetails = async (address: string) => {
    const playerDetails = await readFromBlockchain(
      "get_player_details",
      GAME_ADDRESS,
      account,
      [address]
    );
    if (playerDetails) {
      console.log("Player details are ___", playerDetails);
      setPlayerDetails(playerDetails);
    }
    return playerDetails;
  };

  const fetchClassicGameDetails = async (_gameId: number) => {
    const classicGameDetails = await readFromBlockchain(
      "get_player_classic_game",
      GAME_ADDRESS,
      account,
      [account?.address, _gameId]
    );
    console.log(
      "Classic game details are ==============>>>>>",
      classicGameDetails
    );
    return classicGameDetails;
  };

  const fetchClassicGameAttempts = async (_gameId: number) => {
    const classicGameAttempts = await readFromBlockchain(
      "get_player_classic_game_attempts",
      GAME_ADDRESS,
      account,
      [account?.address, _gameId]
    );
    console.log(
      "Player classic game attempts are ---- ==============>>>>>",
      classicGameAttempts
    );
    return classicGameAttempts;
  };

  const fetchDailyGameAttempts = async (_gameId: number) => {
    const dailyGameAttempts = await readFromBlockchain(
      "get_player_daily_game_attempts",
      GAME_ADDRESS,
      account,
      [account?.address, _gameId]
    );
    console.log(
      "Player daily game attempts are ---- ==============>>>>>",
      dailyGameAttempts
    );
    return dailyGameAttempts;
  };

  const createNewClassicGame = async () => {
    try {
      const receipt = await writeToBlockchain(
        "create_new_classic_game",
        account,
        GAME_ADDRESS,
        gameAbi
      );

      if (receipt) {
        console.log("Game created successfully!", receipt);
        return true;
      }
    } catch (error) {
      console.error("Error creating new classic game:", error);
      return false;
    }
  };

  return {
    fetchUserClassicGames,
    fetchClassicGameDetails,
    fetchPlayerDetails,
    fetchClassicGameAttempts,
    fetchUserDailyGame,
    fetchDailyGameAttempts,
    playerDetails,
    playerClassicGames,
    createNewClassicGame,
    fetchDailyGameId,
  };
};

export default useGameLogic;
