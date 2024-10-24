import WalletIcon from "../../assets/svg/WalletIcon";

export default function ConnectWalletBtn({ text, connect }: { text: string, connect: () => void; }) {
    return (
        <button onClick={() => {
            connect()
            // alert('hello')
            }} className="text-[15px] flex items-center gap-x-[11px] leading-[20px] font-medium text-white px-[14px] py-[9px] bg-black rounded-full w-fit">
            <WalletIcon />
            {text}
        </button>
    );
}
