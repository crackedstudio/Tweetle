interface LetterBoxProps {
    state: number;
    letter: string;
}

//wrong refers to right but in wrong place
export default function LetterBox({ state, letter }: LetterBoxProps) {
    if (state == 2) {
        return <Letter letterColor="bg-green-400" letter={letter} />;
    } else if (state == 1) {
        return <Letter letterColor="bg-yellow-600" letter={letter} />;
    } else {
        return <Letter letterColor="bg-[#121213]" letter={letter} />;
    }
}

function Letter({
    letterColor,
    letter,
}: {
    letterColor: string;
    letter: string;
}) {
    return (
        <div
            className={`w-[62px] h-[62px] border-[2px] border-[#3A3A3C] justify-center items-center ${letterColor} text-4xl uppercase font-bold text-white flex justify-center items-center`}
        >
            {letter}
        </div>
    );
}
