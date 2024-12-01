import DashboardButtons from "../dashboard/DashboardButtons";
import GlassCard from "../dashboard/GlassCard";
import HomeHeroSection from "../dashboard/HomeHeroSection";
import arrowRight from "../../assets/arrow-right.png";
import PwdByStrk from "../ui/PwdByStrk";
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
                            <DashboardButtons where="/">
                                <p>DAILY CHALLENGE</p>
                            </DashboardButtons>
                            <DashboardButtons where="/">
                                <p>CLASSIC</p>
                            </DashboardButtons>
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
