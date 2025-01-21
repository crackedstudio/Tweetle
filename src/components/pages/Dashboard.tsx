import DashboardButtons from "../dashboard/DashboardButtons";
import GlassCard from "../dashboard/GlassCard";
import HomeHeroSection from "../dashboard/HomeHeroSection";
import arrowRight from "../../assets/arrow-right.png";
import PwdByStrk from "../ui/PwdByStrk";
import useGameLogic from "../../hooks/useGameLogic";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { div, h4 } from "framer-motion/client";
import HomeStats from "../dashboard/HomeStats";

interface OutletContextType {
    account: any | null;
    updatePlayerDetails: ({}) => void;
    updatePlayerClassicGames: ([]) => void;
    updatePlayerClassicGameCount: (a: number) => void;
    handleOutsideExecution: () => boolean;
    isAccountDeployed: boolean;
}

const Dashboard = () => {
    const {
        account,
        updatePlayerDetails,
        updatePlayerClassicGameCount,
        updatePlayerClassicGames,
        handleOutsideExecution,
        isAccountDeployed,
    } = useOutletContext<OutletContextType>();
    const { fetchPlayerDetails, fetchUserClassicGames } = useGameLogic();

    useEffect(() => {
        const registerUser = async () => {
            if (!account) return;
            const _isAccountDeployed = await account?.isDeployed();
            if (_isAccountDeployed) return;
            const _playerDetails = await fetchPlayerDetails(account?.address);
            const _isPlayerRegistered = _playerDetails?.is_registered;
            if (_isPlayerRegistered) return;
            const _registeredSuccessfully = await handleOutsideExecution();
            console.log(
                "DID USER REGISTER SUCCESSFULLY",
                _registeredSuccessfully
            );
        };

        const performAllUpdates = async () => {
            const _playerDetails = await fetchPlayerDetails(account?.address);
            const _playerClassicGames = await fetchUserClassicGames();
            updatePlayerDetails(_playerDetails);
            updatePlayerClassicGames(_playerClassicGames);
            updatePlayerClassicGameCount(
                Number(_playerDetails?.classic_game_count)
            );
        };
        if (account) {
            performAllUpdates();
            if (isAccountDeployed) {
                registerUser();
            }
        }
    }, []);

    if (isAccountDeployed) {
        return (
            <div className=" p-5 flex flex-col items-center gap-y-2">
                <h4 className="font-bold text-black">
                    Please deploy your account
                </h4>
                <p className="text-[20px]">
                    we sent you some strk send some to another address to fully
                    to get your account deployed and stsrt tweetling !!!
                </p>

                <a
                    className="p-2 bg-white text-blue-800"
                    href="https://t.me/ArgentTestBot"
                >
                    open argent
                </a>
            </div>
        );
    }

    return (
        <>
            <div className="h-full overflow-auto text-white">
                <HomeHeroSection />

                <div className="bg-black p-2 flex flex-col text-white space-y-4">
                    <HomeStats />
                    <GlassCard>
                        <>
                            <div className="w-full">
                                <DashboardButtons where="/play">
                                    <div className="flex flex-col space-y-2">
                                        <p className="text-xl font-bold">
                                            DAILY CHALLENGE
                                        </p>
                                        <div className="flex space-x-2 text-[#7FF474] font-bold text-sm items-center">
                                            <p className="">
                                                <svg
                                                    width="6"
                                                    height="6"
                                                    viewBox="0 0 6 6"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <circle
                                                        cx="3"
                                                        cy="3"
                                                        r="3"
                                                        fill="#7FF474"
                                                    />
                                                </svg>
                                            </p>
                                            <p>245 Active players</p>
                                        </div>
                                    </div>
                                </DashboardButtons>
                            </div>
                            <div className="w-full">
                                <DashboardButtons where="/classic">
                                    <div className="flex flex-col space-y-2">
                                        <p className="text-xl font-bold">
                                            CLASSIC
                                        </p>
                                        <div className="flex space-x-2 text-[#7FF474] font-bold text-sm items-center">
                                            <p className="">
                                                <svg
                                                    width="6"
                                                    height="6"
                                                    viewBox="0 0 6 6"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <circle
                                                        cx="3"
                                                        cy="3"
                                                        r="3"
                                                        fill="#7FF474"
                                                    />
                                                </svg>
                                            </p>
                                            <p>24 Games Played</p>
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
                        <img
                            src={arrowRight}
                            alt="arrow-right"
                            className="inline"
                        />
                    </p>
                    <div className="">
                        <PwdByStrk />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
