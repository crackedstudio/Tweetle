import celebrateGif from "../../assets/celebrate.gif";
import cancel from "../../assets/cancel-circle.png";
import NeonSpinner from "./NeonSpinner";

interface WinModalProps {
    cancelHandler: () => void;
    claimHandler?: () => void;
    shareHandler?: () => void;
    loadingState?: boolean;
    pointsWon: number;
    emojiTweet: string;
    canShare: boolean;
}

const WinModal = ({
    cancelHandler,
    claimHandler,
    loadingState,
    pointsWon,
    emojiTweet,
    canShare,
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

                            {canShare && (
                                <button className="bg-[#F5F5F580] text-center w-[203px] block h-[73px] rounded-xl text-white border-[3px] border-[#C4C4C4] shadow-[0_10px_0_0_rgba(0,0,0,1),0_12px_0_0_rgba(225,225,225,1)]">
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=${emojiTweet}%20I%20just%20finished%20playing%20Tweetle%20and%20i%20scored%20${pointsWon}%20points%2C%20go%20check%20it%20out%20%40tweetlehq%20%40starknet%0A%23starknet%20%23tweetle`}
                                        target="_blank"
                                    >
                                        Share your progress
                                    </a>
                                </button>
                            )}
                        </div>
                    </>
                )}
                {loadingState && (
                    <div className="">
                        <div className="w-full mt-[30%]">
                            <NeonSpinner
                                firstText="Claiming"
                                secondText="Points"
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default WinModal;
