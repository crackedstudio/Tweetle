import genAnimation from "../../assets/generateGame.mp4";

const GenModal = () => {
    return (
        <>
            <div className="bg-[#000000] h-[80%] w-full absolute top-[10%]">
                <div className="">
                    <video
                        src={genAnimation}
                        loop
                        autoPlay
                        className="w-full mt-[30%]"
                    />
                </div>
            </div>
        </>
    );
};

export default GenModal;
