interface LetterBoxProps {
    letter: string;
    correct?: boolean;
    wrong?: boolean;
}

//wrong refers to right but in wrong place
export default function LetterBox({ letter, correct, wrong }: LetterBoxProps) {
    if (correct) {
        return <Letter letterColor="bg-green-400" letter={letter} />;
    } else if (wrong) {
        return <Letter letterColor="bg-yellow-600" letter={letter} />;
    } else {
        return <Letter letterColor="bg-slate-100" letter={letter} />;
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
            className={`w-[62px] h-[62px] border-[2px] border-[#3A3A3C] justify-center items-center ${letterColor} text-4xl uppercase font-bold text-white bg-transparent`}
        >
            {letter}
        </div>
    );
}
