import hintIcon from "../../assets/hintIcon.png";
import right from "../../assets/right.png";

const GameBottomNav = () => {
    return (
        <div className="flex justify-between w-full pb-5 pt-2 px-3">
            <div className="flex space-x-2 items-center w-full">
                <img src={hintIcon} alt="hintIcon" />
                <p>Hint</p>
            </div>
            <div className="w-full">
                <button className="w-[109px] h-[42px] bg-[#EB69B7] rounded-[100px] text-white">
                    Submit
                </button>
            </div>
            <div>
                <button className="w-[109px] h-[42px] bg-[#C4C4C429] rounded-[100px] text-white">
                    Next <img src={right} alt="right" className="inline" />
                </button>
            </div>
        </div>
    );
};

export default GameBottomNav;
