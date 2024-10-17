import starkLogo from "../assets/starkLogo.png";
import tweetle from "../assets/banner.png";
import ConnectWalletBtn from "../components/ui/ConnectWalletBtn";
const Home = () => {
    return (
        <div className="page-container">
            <div className="mt-8">
                <h1 className="font-jakarta text-white text-center">
                    Powered by{" "}
                    <span>
                        <img
                            src={starkLogo}
                            className="inline"
                            alt="starknetLogo"
                        />
                    </span>{" "}
                    Starknet
                </h1>
            </div>
            <div className="mt-48 flex flex-col space-y-12">
                <div className="flex justify-center">
                    <img src={tweetle} alt="bannerText" />
                </div>
                <div>
                    <span className="text-white text-2xl block text-center">
                        Play to win{" "}
                    </span>
                </div>
                <div className="px-5">
                    <ConnectWalletBtn />
                </div>
            </div>
        </div>
    );
};

export default Home;
