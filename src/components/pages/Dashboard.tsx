import DashboardButtons from "../dashboard/DashboardButtons";
import GlassCard from "../dashboard/GlassCard";
import HomeHeroSection from "../dashboard/HomeHeroSection";
import arrowRight from "../../assets/arrow-right.png";
import PwdByStrk from "../ui/PwdByStrk";
import calendar from "../../assets/solar_calendar-date-bold.png";
// import HomeStats from "../dashboard/HomeStats";

const Dashboard = () => {
    return (
        <>
            <div className="h-full overflow-auto text-white">
                <HomeHeroSection />
                <div className="bg-black p-2 flex flex-col text-white">
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
                                    <DashboardButtons where="/play" hasPair>
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
                    <div className="mt-3">
                        <PwdByStrk />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
