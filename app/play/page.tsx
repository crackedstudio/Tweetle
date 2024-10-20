"use client";
import { useState } from "react";
import GameBottomNav from "../components/gameplay/game-bottom-nav";
import Keyboard from "../components/gameplay/keyboard";
import WordBox from "../components/gameplay/word-box";
import GameTopNav from "../components/gameplay/game-top-nav";

const page = () => {
    const handleSubmit = () => {
        console.log("Submitted");
    };

    const getKeyboardInput = () => {
        console.log("fetched keyboard input");
    };

    const [wordBoxes, setWordBoxes] = useState<string[][]>(
        Array(6)
            .fill(null)
            .map(() => Array(5).fill(""))
    );

    // Example function to update a specific "box"
    const updateBox = (
        outerIndex: number,
        innerIndex: number,
        value: string
    ) => {
        setWordBoxes((prevBoxes) => {
            const newBoxes = [...prevBoxes];
            newBoxes[outerIndex] = [...newBoxes[outerIndex]];
            newBoxes[outerIndex][innerIndex] = value;
            return newBoxes;
        });
    };

    return (
        <div className="flex flex-col">
            <div>
                <GameTopNav />
            </div>
            <div className="bg-[#121213] px-2 py-1">
                {wordBoxes.map((wordArray, index) => (
                    <WordBox wordArray={wordArray} key={index} />
                ))}
            </div>
            <div className="bg-black pb--1">
                <div className="mt-2">
                    <Keyboard clickHandler={getKeyboardInput} />
                </div>
                <div className="mt-2">
                    <GameBottomNav />
                </div>
            </div>

            {/* </> */}
            {/* )} */}
        </div>
    );
};

export default page;
