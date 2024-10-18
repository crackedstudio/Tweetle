import ConnectButton from "./components/connect-button";
import GameTitle from "./components/game-title";
import Navigation from "./components/navigation";
import PoweredBy from "./components/powered-by";

export default function Home() {
  return (
    <div className="bg-white h-[100dvh] w-[100dvw] flex justify-center items-center">
      <div className="w-[400px] relative  max-w-[400px] bg-[#00B1FF] min-h-[720px] text-white">
        <div className="pt-[34px] px-6">
          <PoweredBy />
          <div className="pt-[130px] pb-[100px]">
            <GameTitle />
            <h3 className="text-2xl leading-[30px] font-semibold text-center mb-[29px] mt-[39px]">
              Play to win
            </h3>
            <ConnectButton />
          </div>
        </div>

        <Navigation />
      </div>
    </div>
  );
}
