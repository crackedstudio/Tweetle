import LetterBox from "./LetterBox";

interface WordBoxProps {
    wordArray: string[];
    wordState: number[];
}

export default function WordBox({ wordArray, wordState }: WordBoxProps) {
    return (
        <div className="flex space-x-1 w-full my-1 justify-center">
            {wordArray.map((letter, index) => (
                <LetterBox
                    key={index}
                    letter={letter}
                    state={wordState[index]}
                />
            ))}
        </div>
    );
}
