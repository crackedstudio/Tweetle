import { ClipLoader } from "react-spinners";
import HomeHeroSection from "../dashboard/HomeHeroSection";
import ArgentLogo from "../../svg/ArgentLogo";

interface FullPageConnect {
  handler: () => void;
  isLoading: boolean;
}
const FullPageConnect = ({ handler, isLoading }: FullPageConnect) => {
  return (
    <div className="flex flex-col px-5 items-center justify-center text-white h-screen bg-no-repeat bg-gradient-svg bg-cover">
      <HomeHeroSection isNavbarActive={false} useBackground={false} />
      <button
        className="bg-black rounded-full w-[90%] mx-auto py-3 mt-4 flex gap-x-2 items-center justify-center"
        onClick={handler}
      >
        {!isLoading && (
          <>
            <ArgentLogo />
            <p>Connect wallet</p>
          </>
        )}
        {isLoading && <ClipLoader color="#fff" size={13} />}
      </button>
    </div>
  );
};

export default FullPageConnect;
