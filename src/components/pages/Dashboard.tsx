import DashboardButtons from "../dashboard/DashboardButtons";
import GlassCard from "../dashboard/GlassCard";
import HomeHeroSection from "../dashboard/HomeHeroSection";
import arrowRight from "../../assets/arrow-right.png";
import PwdByStrk from "../ui/PwdByStrk";
import calendar from "../../assets/solar_calendar-date-bold.png";
import useGameLogic from "../../hooks/useGameLogic";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

interface OutletContextType {
    account: any | null;
    updatePlayerDetails: ({}) => void;
    updatePlayerClassicGames: ([]) => void;
    updatePlayerClassicGameCount: (a: number) => void;
}

const Dashboard = () => {
    const {
        account,
        updatePlayerDetails,
        updatePlayerClassicGameCount,
        updatePlayerClassicGames,
    } = useOutletContext<OutletContextType>();
    const { fetchPlayerDetails, fetchUserClassicGames } = useGameLogic();

    useEffect(() => {
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
        }
    }, []);
    return (
        <>
            <div className="h-full overflow-auto text-white">
                <HomeHeroSection />
                {/* <button onClick={createNewClassicGame}>Create new game</button> */}
                <div className="bg-black p-2 flex flex-col text-white space-y-4">
                    {/* <HomeStats /> */}
                    <GlassCard>
                        <>
                            <div className="flex items-center">
                                <div className="w-3/4">
                                    <DashboardButtons where="/play" hasPair>
                                        <p>DAILY CHALLENGE</p>
                                    </DashboardButtons>
                                </div>

                                <div className="border border-1 flex justify-center items-center p-5 bg-black rounded-r-lg">
                                    <img
                                        src={calendar}
                                        alt="calendar"
                                        className=""
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3/4">
                                    <DashboardButtons where="/classic" hasPair>
                                        <p>CLASSIC</p>
                                    </DashboardButtons>
                                </div>

                                <div className="border border-1 flex justify-center items-center p-4 bg-black rounded-r-lg">
                                    <div className="text-center">
                                        <p className="text-xl">24</p>
                                        <p className="text-sm text-[#6AAA64]">
                                            Played
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    </GlassCard>
                    <div className="flex justify-between h-[50%]">
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
                    </div>
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
