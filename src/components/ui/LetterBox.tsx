export default function LetterBox({
    letter,
    className,
}: {
    letter: string;
    className: string;
}) {
    return (
        <div
            className={`w-[45px] shadow-letterShadow rounded-[3px] font-bold text-[30px] leading-9 h-[45px] flex items-center justify-center text-center bg-[#EB69B7] ${className}`}
        >
            {letter.toUpperCase()}
        </div>
    );
}
