import LetterBox from "./LetterBox";

interface WordBoxProps {
    wordArray: string[];
    correctOrderMap: boolean[];
    wrongOrderMap: boolean[];
}

export default function WordBox({
    wordArray,
    correctOrderMap,
    wrongOrderMap,
}: WordBoxProps) {
    return (
        <div className="flex space-x-1 w-full my-1 justify-center">
            {wordArray.map((letter, index) => (
                <LetterBox
                    key={index}
                    letter={letter}
                    correct={correctOrderMap[index]}
                    wrong={wrongOrderMap[index]}
                />
            ))}
        </div>
    );
}
