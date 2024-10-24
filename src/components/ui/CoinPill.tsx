import coin from "../../assets/svg/coin.svg";
const CoinPill = ({ text }: { text: string }) => {
    return (
        <button className="flex items-center gap-x-2 p-[10px] bg-[#C4C4C429] font-extrabold rounded-full text-base leading-5">
            <img src={coin} alt="" className="w-6" />
            {text}
        </button>
    );
};

export default CoinPill;
