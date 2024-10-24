import celebrateGif from "../../assets/celebrate.gif";
import cancel from "../../assets/cancel-circle.png";

interface WinModalProps {
    cancelHandler: () => void;
    claimHandler?: () => void;
    shareHandler?: () => void;
}

const WinModal = ({
    cancelHandler,
    claimHandler,
    shareHandler,
}: WinModalProps) => {
    return (
        <div className="bg-[#3D336D] h-[80%] w-full absolute top-[10%]">
            <button
                className="relative top-4 left-[90%]"
                onClick={cancelHandler}
            >
                <img src={cancel} alt="cancelCircle" />
            </button>
            <div className="py-12">
                <div className="border-[#FE97D5] border-[6px] w-[250px] h-[250px] mx-auto rounded-full">
                    <img
                        src={celebrateGif}
                        alt="celebrate"
                        className="rounded-full"
                    />
                </div>
            </div>

            <h1 className="text-2xl text-white text-center">Congratulations</h1>
            <div className="mt-5 px-3 flex flex-col space-y-5">
                <button
                    className="bg-[#EB69B7] text-center w-full block h-[48px] rounded-xl text-white"
                    onClick={claimHandler}
                >
                    Claim 23 points
                </button>
                <button
                    className="bg-[#F5F5F5] text-center w-full block h-[48px] rounded-xl text-black"
                    onClick={shareHandler}
                >
                    Share your progress
                </button>
            </div>
        </div>
    );
};

export default WinModal;
