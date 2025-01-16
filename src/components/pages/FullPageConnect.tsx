import ConnectWalletBtn from "../ui/ConnectWalletBtn";

interface FullPageConnect {
    handler: () => void;
}
const FullPageConnect = ({ handler }: FullPageConnect) => {
    return (
        <div className="border border-red-950 absolute inset-0 flex flex-col px-5 items-center justify-center text-white">
            <ConnectWalletBtn text="Connect Wallet" connect={handler} />
            <p className="text-sm">
                Kindly connect wallet before you can proceed
            </p>
        </div>
    );
};

export default FullPageConnect;
