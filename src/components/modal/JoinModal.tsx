import cancel from "../../assets/cancel-circle.png";
import { ClipLoader } from "react-spinners";
// import banner from "../../assets/banner.png";
import DashboardButtons from "../dashboard/DashboardButtons";
import HomeHeroSection from "../dashboard/HomeHeroSection";
import { CircleX } from "lucide-react";

interface JoinModalProps {
  cancelHandler?: () => void;
  joinHandler?: () => void;
  isDailyModal: boolean;
  isLoading?: boolean;
}

const JoinModal = ({
  cancelHandler,
  joinHandler,
  isDailyModal,
  isLoading,
}: JoinModalProps) => {
  return (
    <div className="bg-black inset-0 w-full absolute z-[50]">
      <div className="py-4 flex flex-col pt-[150px] space-y-4 w-[80%] mx-auto mt-4">
        {isDailyModal && (
          <>
            <h1 className="text-[#FE97D5] text-center text-2xl font-bold">
              Welcome to Today's Daily Challenge!
            </h1>
            <p className="text-center text-white">
              Think you can guess the word of the day? You’ve got 6 tries to
              crack the code. Earn up to{" "}
              <span className="text-[#FE97D5]">25 points </span>
              if you get it right on the first try and move closer to the top of
              the leaderboard!
            </p>
            <h1 className="text-[#FE97D5] text-center text-2xl font-bold">
              {" "}
              Pro Tip
            </h1>
            <p className="text-center">
              Makes sense to always start out with an "AEIOU" combination so you
              know all vowels
            </p>
          </>
        )}
        {!isDailyModal && (
          <>
            {/* <HomeHeroSection isNavbarActive={false} /> */}
            <DashboardButtons where="/">
              <div className="flex flex-col space-y-3 py-5">
                <h1 className="text-[#FE97D5] text-center text-sm font-bold">
                  NOTE!
                </h1>
                <p className="text-center text-sm">
                  KIndly ensure you have deployed your starknet account before
                  proceeding
                </p>
              </div>
            </DashboardButtons>
          </>
        )}
      </div>
      <button
        className="bg-[#12830D] mx-auto text-center w-[203px] block py-3 text-sm rounded-xl text-white border-[3px] border-[#71ED00] shadow-[0_5px_0_0_rgba(0,81,37,1),0_7px_0_0_rgba(113,237,0,1)]"
        onClick={joinHandler}
      >
        {!isLoading ? "BEGIN" : <ClipLoader color="#fff" size={11} />}
      </button>
    </div>
  );
};

export default JoinModal;
