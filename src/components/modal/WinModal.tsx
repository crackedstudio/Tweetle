import celebrateGif from "../../assets/celebrate.gif";
import cancel from "../../assets/cancel-circle.png";
import claimAnimation from "../../assets/claimingPoints.mp4";

interface WinModalProps {
    cancelHandler: () => void;
    claimHandler?: () => void;
    shareHandler?: () => void;
    loadingState?: boolean;
}

const WinModal = ({
    cancelHandler,
    claimHandler,
    shareHandler,
    loadingState,
}: WinModalProps) => {
    return (
        <>
            <div className="bg-[#000000] h-[80%] w-full absolute top-[10%]">
                <button
                    className="relative top-4 left-[90%]"
                    onClick={cancelHandler}
                >
                    <img src={cancel} alt="cancelCircle" />
                </button>
                {!loadingState && (
                    <>
                        <div className="py-4">
                            <h1 className="text-[40px] text-[#71ED00] text-center my-3 bungee-regular">
                                YOU'RE RIGHT
                            </h1>
                            <div className="border-[#538D4E] border-[6px] w-[200px] h-[200px] mx-auto rounded-full">
                                <img
                                    src={celebrateGif}
                                    alt="celebrate"
                                    className="rounded-full"
                                />
                            </div>
                        </div>

                        <div className="mt-3 px-3 flex flex-col space-y-6 items-center">
                            <button
                                className="bg-[#12830D] text-center w-[203px] block h-[73px] rounded-xl text-white border-[3px] border-[#71ED00] shadow-[0_10px_0_0_rgba(0,81,37,1),0_12px_0_0_rgba(113,237,0,1)]"
                                onClick={claimHandler}
                            >
                                CLAIM POINTS
                            </button>

                            <button
                                className="bg-[#F5F5F580] text-center w-[203px] block h-[73px] rounded-xl text-white border-[3px] border-[#C4C4C4] shadow-[0_10px_0_0_rgba(0,0,0,1),0_12px_0_0_rgba(225,225,225,1)]"
                                onClick={shareHandler}
                            >
                                Share your progress
                            </button>
                        </div>
                    </>
                )}
                {loadingState && (
                    <div className="">
                        <video
                            src={claimAnimation}
                            loop
                            autoPlay
                            className="w-full mt-[30%]"
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default WinModal;
