import React from "react";
import KeyboardButton from "./keyboard-button";

const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m", " x "],
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
                            onClick={clickHandler}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
