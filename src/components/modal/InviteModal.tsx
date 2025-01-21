import { motion, AnimatePresence } from "framer-motion";
import cancel from "../../assets/cancel-circle.png";

interface InviteModalProps {
    cancelHandler: () => void;
    copyHandler?: () => void;
    shareHandler?: () => void;
    isOpen: boolean; // Add isOpen prop to control animation
    copyStatus: boolean;
}

const InviteModal = ({
    cancelHandler,
    copyHandler,
    shareHandler,
    isOpen,
    copyStatus,
}: InviteModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="bg-[#18191B] h-[50%] w-full absolute bottom-0 rounded-t-xl"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 300,
                    }}
                >
                    <button
                        className="relative top-4 left-[90%]"
                        onClick={cancelHandler}
                    >
                        <img src={cancel} alt="cancelCircle" />
                    </button>
                    <div>
                        <h1 className="text-center text-2xl font-bold">
                            Invite Friends
                        </h1>
                    </div>
                    <div></div>
                    <div className="flex flex-col space-y-4 px-4 mt-8">
                        <button
                            className="block w-full text-center text-black bg-white py-3 font-bold rounded-lg"
                            onClick={copyHandler}
                        >
                            {copyStatus ? "Copied" : "Copy Link"}
                        </button>
                        <button
                            className="block w-full text-center text-black bg-white py-3 font-bold rounded-lg"
                            onClick={shareHandler}
                        >
                            Share Link
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InviteModal;
