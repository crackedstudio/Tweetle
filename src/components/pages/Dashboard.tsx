import DashboardButtons from "../dashboard/DashboardButtons";
import GlassCard from "../dashboard/GlassCard";
import HomeHeroSection from "../dashboard/HomeHeroSection";
import arrowRight from "../../assets/arrow-right.png";
import PwdByStrk from "../ui/PwdByStrk";
import useGameLogic from "../../hooks/useGameLogic";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import HomeStats from "../dashboard/HomeStats";
import JoinModal from "../modal/JoinModal";
import { Bounce, toast } from "react-toastify";

interface OutletContextType {
  account: any | null;
  updatePlayerDetails: ({}) => void;
  updatePlayerClassicGames: ([]) => void;
  updateAllPlayers: ([]) => void;
  deployAccount: () => void;
  updatePlayerClassicGameCount: (a: number) => void;
  updateShowJoinModal: (a: boolean) => void;
  handleOutsideExecution: () => boolean;
  showJoinModal: boolean;
  allPlayers: [];
  handleClearSessionButton: () => void;
}

const Dashboard = () => {
  const {
    account,
    updatePlayerDetails,
    updatePlayerClassicGameCount,
    updatePlayerClassicGames,
    handleOutsideExecution,
    updateAllPlayers,
    showJoinModal,
    updateShowJoinModal,
    deployAccount,
    handleClearSessionButton,
    allPlayers,
  } = useOutletContext<OutletContextType>();
  const { fetchPlayerDetails, fetchUserClassicGames, fetchAllPlayers } =
    useGameLogic();
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [isRegistering, setIsRegistering] = useState(false);
  // const [activePlayers, setActivePlayers] = useState(0)

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

  const registerUser = async () => {
    if (!account) return;
    const _isAccountConnected = await account?.getSessionStatus();
    if (_isAccountConnected !== "VALID") {
      await handleClearSessionButton();
      return;
    }
    const _isAccountDeployed = await account?.isDeployed();
    console.log("is acct deployed in reg user --", _isAccountDeployed);
    if (!_isAccountDeployed) {
      console.log("deplooying account ---");
      await deployAccount;
    }

    const _playerDetails = await fetchPlayerDetails(account?.address);
    const _isPlayerRegistered = _playerDetails?.is_registered;
    if (_isPlayerRegistered) {
      return true;
    }
    const _registeredSuccessfully = await handleOutsideExecution();
    console.log("DID USER REGISTER SUCCESSFULLY", _registeredSuccessfully);
    let __playerDetails = await fetchPlayerDetails(account?.address);
    let __isPlayerRegistered = __playerDetails?.is_registered;
    return __isPlayerRegistered;
  };

  const handleJoinModal = async () => {
    try {
      setIsRegistering(true);
      const _isPlayerRegistered = await registerUser();
      if (_isPlayerRegistered) {
        callToast("Welcome to Tweetle");
        updateShowJoinModal(false);
      } else {
        callToast("Failed to Register User");
      }
    } catch (err) {
      console.log("error is ---", err);
      callToast("Error with User registration , please try again!");
    } finally {
      setIsRegistering(false);
    }
  };

  useEffect(() => {
    const performAllUpdates = async () => {
      const _playerDetails = await fetchPlayerDetails(account?.address);
      const _isPlayerRegistered = _playerDetails?.is_registered;
      if (!_isPlayerRegistered) {
        updateShowJoinModal(true);
      }

      const _playerClassicGames = await fetchUserClassicGames();
      updatePlayerDetails(_playerDetails);
      updatePlayerClassicGames(_playerClassicGames);
      let _gamesPlayed = 0;
      for (let i of _playerClassicGames) {
        if (i.is_completed) _gamesPlayed += 1;
      }
      setGamesPlayed(_gamesPlayed);
      updatePlayerClassicGameCount(Number(_playerDetails?.classic_game_count));
      const _allPlayers = await fetchAllPlayers();
      updateAllPlayers(_allPlayers);
    };
    if (account) {
      performAllUpdates();
    }
    console.log("SHOW JOIN MODAL is ", showJoinModal);
  }, []);

  return (
    <>
      <div className="h-full overflow-auto text-white">
        <HomeHeroSection isNavbarActive={true} />

        {!showJoinModal && (
          <div className="bg-black p-2 flex flex-col text-white space-y-4">
            <HomeStats />
            <GlassCard>
              <>
                <div className="w-full">
                  <DashboardButtons where="/play">
                    <div className="flex flex-col space-y-2">
                      <p className="text-xl font-bold">DAILY CHALLENGE</p>
                      <div className="flex space-x-2 text-[#7FF474] font-bold text-sm items-center">
                        <p className="">
                          <svg
                            width="6"
                            height="6"
                            viewBox="0 0 6 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="3" cy="3" r="3" fill="#7FF474" />
                          </svg>
                        </p>
                        <p>
                          {allPlayers.length} Active player
                          {allPlayers.length > 1 && "s"}
                        </p>
                      </div>
                    </div>
                  </DashboardButtons>
                </div>
                <div className="w-full">
                  <DashboardButtons where="/classic">
                    <div className="flex flex-col space-y-2">
                      <p className="text-xl font-bold">CLASSIC</p>
                      <div className="flex space-x-2 text-[#7FF474] font-bold text-sm items-center">
                        <p className="">
                          <svg
                            width="6"
                            height="6"
                            viewBox="0 0 6 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="3" cy="3" r="3" fill="#7FF474" />
                          </svg>
                        </p>
                        <p>{gamesPlayed} Games Played</p>
                      </div>
                    </div>
                  </DashboardButtons>
                </div>
              </>
            </GlassCard>
            {/* <div className="flex justify-between h-[50%]">
                        <DashboardButtons where="/">
                            <p className="w-[50%] mx-auto text-center">
                                WORD FEVER
                            </p>
                        </DashboardButtons>
                        <DashboardButtons where="/">
                            <p className="w-[50%] mx-auto text-center">
                                SECRET WORD
                            </p>
                        </DashboardButtons>
                    </div> */}
            <p className="text-white text-center">
              How to Play!{" "}
              <img src={arrowRight} alt="arrow-right" className="inline" />
            </p>
            <div className="">
              <PwdByStrk />
            </div>
          </div>
        )}
        {showJoinModal && (
          <JoinModal
            cancelHandler={() => {}}
            isDailyModal={false}
            joinHandler={handleJoinModal}
            isLoading={isRegistering}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
