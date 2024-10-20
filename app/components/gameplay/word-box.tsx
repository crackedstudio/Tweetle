import React from "react";
import LetterBox from "./letter-box";

interface WordBoxProps {
    wordArray: string[];
}

export default function WordBox({ wordArray }: WordBoxProps) {
    return (
        <div className="flex space-x-1 w-full my-1 justify-center">
            {wordArray.map((letter, index) => (
                <LetterBox key={index} letter={letter} />
            ))}
        </div>
    );
}
