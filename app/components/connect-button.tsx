import WalletIcon from "../svg/WalletIcon";

export default function ConnectButton() {
  return (
    <button className="text-[15px] flex items-center gap-x-[11px] leading-[20px] font-medium text-white px-[14px] py-[9px] bg-black rounded-full w-fit">
      <WalletIcon />
      Connect Wallet
    </button>
  );
}
