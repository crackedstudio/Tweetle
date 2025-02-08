import NeonSpinner from "./NeonSpinner";

const GenModal = () => {
    return (
        <>
            <div className="bg-[#000000] h-[80%] w-full absolute top-[10%]">
                <div className="">
                    <div className="w-full mt-[30%]">
                        <NeonSpinner firstText="Generating" secondText="Game" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GenModal;
