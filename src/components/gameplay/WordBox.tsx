import LetterBox from "./LetterBox";
import { ClipLoader } from "react-spinners";

interface WordBoxProps {
    wordArray: string[];
    wordState: number[];
    isLoading?: boolean;
}

export default function WordBox({
    wordArray,
    wordState,
    isLoading,
}: WordBoxProps) {
    return (
        <div className="flex">
            <div className="flex space-x-1 w-full my-1 justify-center">
                {wordArray.map((letter, index) => (
                    <LetterBox
                        key={index}
                        letter={letter}
                        state={wordState[index]}
                    />
                ))}
            </div>
            {isLoading && <ClipLoader color="#fff" size={11} />}
        </div>
    );
}
