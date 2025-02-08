import cancel from "../../assets/cancel-circle.png";
import Adblock from "../../assets/svg/ad-block.svg";

interface LoseModalProps {
    cancelHandler: () => void;
    claimHandler?: () => void;
    shareHandler?: () => void;
    loadingState?: boolean;
    pointsWon: number;
    emojiTweet: string;
    canShare: boolean;
}

const LoseModal = ({
    cancelHandler,
    claimHandler,
    shareHandler,
    loadingState,
    pointsWon,
    emojiTweet,
    canShare,
}: LoseModalProps) => {
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
                                TRY AGAIN
                            </h1>
                            <div className="flex justify-center items-center">
                                <img
                                    src={Adblock}
                                    alt="end"
                                    className="rounded-full block"
                                />
                            </div>
                        </div>

                        <div className="mt-5 px-3 flex flex-col space-y-6 items-center">
                            <button
                                className="bg-[#12830D] text-center w-[203px] block h-[73px] rounded-xl text-white border-[3px] border-[#71ED00] shadow-[0_10px_0_0_rgba(0,81,37,1),0_12px_0_0_rgba(113,237,0,1)]"
                                onClick={claimHandler}
                            >
                                Claim Points
                            </button>

                            {canShare && (
                                <button
                                    className="bg-[#F5F5F580] text-center w-[203px] block h-[73px] rounded-xl text-white border-[3px] border-[#C4C4C4] shadow-[0_10px_0_0_rgba(0,0,0,1),0_12px_0_0_rgba(225,225,225,1)]"
                                    onClick={shareHandler}
                                >
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
                        <video
                            src={
                                "https://res.cloudinary.com/dzlhavqtd/video/upload/v1737145163/n3y1xo3zehavtp2ozpqp.mp4"
                            }
                            loop
                            autoPlay
                            className="w-full mt-[30%]"
                            controls={false}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default LoseModal;
