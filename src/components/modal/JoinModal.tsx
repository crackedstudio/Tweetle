import cancel from "../../assets/cancel-circle.png";
// import banner from "../../assets/banner.png";
import DashboardButtons from "../dashboard/DashboardButtons";
import HomeHeroSection from "../dashboard/HomeHeroSection";

interface JoinModalProps {
    cancelHandler: () => void;
    joinHandler?: () => void;
    isDailyModal: boolean;
}

const JoinModal = ({
    cancelHandler,
    joinHandler,
    isDailyModal,
}: JoinModalProps) => {
    return (
        <>
            <div className="bg-[#000000] h-[80%] w-full absolute top-[10%]">
                <button
                    className="relative top-4 left-[90%]"
                    onClick={cancelHandler}
                >
                    <img src={cancel} alt="cancelCircle" />
                </button>
                <>
                    <div className="py-4 flex flex-col space-y-4 w-[80%] mx-auto mt-4">
                        {isDailyModal && (
                            <>
                                <h1 className="text-[#FE97D5] text-center text-2xl font-bold">
                                    Welcome to Today's Daily Challenge!
                                </h1>
                                <p className="text-center text-white">
                                    Think you can guess the word of the day?
                                    You’ve got 6 tries to crack the code. Earn
                                    up to{" "}
                                    <span className="text-[#FE97D5]">
                                        25 points{" "}
                                    </span>
                                    if you get it right on the first try and
                                    move closer to the top of the leaderboard!
                                </p>
                                <h1 className="text-[#FE97D5] text-center text-2xl font-bold">
                                    {" "}
                                    Pro Tip
                                </h1>
                                <p className="text-center">
                                    Makes sense to always start out with an
                                    "AEIOU" combination so you know all vowels
                                </p>
                            </>
                        )}
                        {!isDailyModal && (
                            <>
                                <HomeHeroSection isNavbarActive={false} />
                                <DashboardButtons where="/">
                                    <div className="flex flex-col space-y-3">
                                        <h1 className="text-[#FE97D5] text-center text-xl font-bold">
                                            {" "}
                                            NOTE !!!
                                        </h1>
                                        <p className="text-center">
                                            KIndly ensure you have deployed your
                                            starknet account before proceeding
                                        </p>
                                    </div>
                                </DashboardButtons>
                            </>
                        )}
                    </div>

                    <div className="mt-2 px-3 flex flex-col space-y-6 items-center">
                        <button
                            className="bg-[#12830D] text-center w-[203px] block h-[73px] rounded-xl text-white border-[3px] border-[#71ED00] shadow-[0_10px_0_0_rgba(0,81,37,1),0_12px_0_0_rgba(113,237,0,1)]"
                            onClick={joinHandler}
                        >
                            BEGIN
                        </button>
                    </div>
                </>
            </div>
        </>
    );
};

export default JoinModal;
