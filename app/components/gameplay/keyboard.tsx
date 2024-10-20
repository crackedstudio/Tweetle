import React from "react";
import KeyboardButton from "./keyboard-button";

const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", "del"],
];

interface KeyboardProps {
    clickHandler: (key: string) => void;
}

export default function Keyboard({ clickHandler }: KeyboardProps) {
    return (
        <div className="flex flex-col items-center">
            {keys.map((row, i) => (
                <div key={i} className="flex">
                    {row.map((key) => (
                        <KeyboardButton
                            key={key}
                            keyChar={key}
                            onClick={() => clickHandler(key)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
