import LetterBox from "../ui/LetterBox";
import PoweredBy from "../ui/PwdByStrk";
import readingOwl from "../../assets/reading-owl.png";
import coin from "../../assets/svg/coin.svg";

export default function LoadingFullPage() {
    return (
        <div className="absolute inset-0 flex flex-col px-5 items-center text-white z-[200] pt-[66px] bg-gradient-svg">
            <img src={readingOwl} alt="reading-owl" />
            <div className="flex justify-center gap-x-[15px] mt-[-29px] mb-6">
                {"TWEETLE".split("").map((letter, i) => (
                    <LetterBox
                        letter={letter}
                        key={i}
                        className="!w-[35px] !h-[35px] !text-[24px] !leading-[30px]"
                    />
                ))}
            </div>
            <h4 className="font-semibold text-lg leading-5 text-[#F5F5F6B2]">
                Solve. Score. Win Rewards
            </h4>

            <div className="flex items-center mt-6 mb-12">
                <img src={coin} className="animate-rotateX h-6 w-6" alt="" />
            </div>

            <div className="first-letter:text-center">
                <PoweredBy />
            </div>
        </div>
    );
}
