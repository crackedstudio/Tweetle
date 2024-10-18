import starkLogo from "../../assets/starkLogo.png";
const PwdByStrk = () => {
    return (
        <h1 className="font-jakarta text-white text-center">
            Powered by{" "}
            <span>
                <img src={starkLogo} className="inline" alt="starknetLogo" />
            </span>{" "}
            Starknet
        </h1>
    );
};

export default PwdByStrk;
