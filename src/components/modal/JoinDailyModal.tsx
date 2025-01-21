import cancel from "../../assets/cancel-circle.png";

interface JoinDailyModalProps {
    cancelHandler: () => void;
    joinHandler?: () => void;
}

const JoinDailyModal = ({
    cancelHandler,
    joinHandler,
}: JoinDailyModalProps) => {
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
                    <div className="py-4">
                        <h1 className="text-[40px] text-[#71ED00] text-center my-3 bungee-regular">
                            YOU'RE WELCOME, YOU ARENT IN ANY DAILY GAME
                        </h1>
                    </div>

                    <div className="mt-3 px-3 flex flex-col space-y-6 items-center">
                        <button
                            className="bg-[#12830D] text-center w-[203px] block h-[73px] rounded-xl text-white border-[3px] border-[#71ED00] shadow-[0_10px_0_0_rgba(0,81,37,1),0_12px_0_0_rgba(113,237,0,1)]"
                            onClick={joinHandler}
                        >
                            JOIN DAILY GAME
                        </button>
                    </div>
                </>
            </div>
        </>
    );
};

export default JoinDailyModal;
