import tweetle from "../assets/banner.png";
import coin from "../assets/Coin.png";
import PwdByStrk from "./ui/PwdByStrk";

const SplashScreen = () => {
    return (
        <div className="mt-5 flex flex-col space-y-36">
            <div className="flex flex-col space-y-2">
                <div className="gif-container">
                    <img
                        src="/bird.png"
                        alt="Animated GIF"
                        className="w-full h-auto"
                    />
                </div>
                <div>
                    <div className="flex justify-center">
                        <img src={tweetle} alt="bannerText" />
                    </div>
                    <p className="mt-4 text-center text-2xl text-gray-400">
                        Solve. Score. Win Rewards
                    </p>
                </div>
                <div className="flex justify-center">
                    <img src={coin} alt="coin" />
                </div>
            </div>
            <div className="mb-auto">
                <PwdByStrk />
            </div>
        </div>
    );
};

export default SplashScreen;
