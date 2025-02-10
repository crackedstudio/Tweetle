import coin from "../../assets/svg/coin.svg";
const CoinPill = ({ text }: { text: string }) => {
  return (
    <button className="flex items-center gap-x-2 py-2 px-3 bg-[#C4C4C429] font-extrabold rounded-full text-xs">
      <img src={coin} alt="" className="w-3" />
      {text}
    </button>
  );
};

export default CoinPill;
