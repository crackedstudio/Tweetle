import DailyChallengeCard from "../dashboard/DailyChallengeCard";
import HomeHeroSection from "../dashboard/HomeHeroSection";
import HomeStats from "../dashboard/HomeStats";

const Dashboard = () => {
    return (
        <>
            <div className="h-full overflow-auto text-white">
                <HomeHeroSection />
                <div className="bg-black p-4 flex flex-col gap-y-5 text-white">
                    <HomeStats />
                    <DailyChallengeCard />
                    <DailyChallengeCard />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
