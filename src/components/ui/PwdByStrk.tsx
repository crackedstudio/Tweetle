import starkLogo from "../../assets/starkLogo.png";
const PwdByStrk = () => {
  return (
    <h1 className="font-jakarta text-white text-center text-xs">
      Powered by
      <span>
        <img src={starkLogo} className="inline w-4 mx-1" alt="starknetLogo" />
      </span>
      Starknet
    </h1>
  );
};

export default PwdByStrk;
