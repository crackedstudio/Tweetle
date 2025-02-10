import { Wallet } from "lucide-react";
export default function ConnectWalletBtn({
  text,
  connect,
}: {
  text: string;
  connect: () => void;
}) {
  return (
    <button
      onClick={() => {
        connect();
        // alert('hello')
      }}
      className="text-xs flex items-center gap-x-2 font-medium text-white px-3 py-2 bg-black rounded-full w-fit h-fit"
    >
      <Wallet size={12} />
      {text}
    </button>
  );
}
