interface KeyboardButtonProps {
    keyChar: string;
    onClick: (key: string) => void;
}

export default function KeyboardButton({
    keyChar,
    onClick,
}: KeyboardButtonProps) {
    return (
        <button
            className="bg-white w-[36.6px] h-[42px] rounded-[4.6px] text-[22px] text-black mr-[2px] mb-1"
            onClick={() => onClick(keyChar)}
        >
            {keyChar}
        </button>
    );
}
