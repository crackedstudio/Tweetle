"use client";
import { useState } from "react";
import GameBottomNav from "../components/gameplay/game-bottom-nav";
import Keyboard from "../components/gameplay/keyboard";
import WordBox from "../components/gameplay/word-box";
import GameTopNav from "../components/gameplay/game-top-nav";
const SAMPLE_WORD = ["C", "O", "V", "I", "D"];

const page = () => {
    const [currentWordbox, setCurrentWordbox] = useState(0);
    const [currentLetterbox, setCurrentLetterbox] = useState(0);

    const initialOrder = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
    ];

    const [correctOrder, setCorrectOrder] = useState<boolean[][]>(initialOrder);
    const [wrongOrder, setWrongOrder] = useState<boolean[][]>(initialOrder);

    const getKeyboardInput = (key: string) => {
        console.log(key);
        updateBox(key);
    };

    const [wordBoxes, setWordBoxes] = useState<string[][]>(
        Array(6)
            .fill(null)
            .map(() => Array(5).fill(""))
    );

    const updateBox = (value: string) => {
        setWordBoxes((prevBoxes) => {
            const newBoxes = [...prevBoxes];
            if (value.toLowerCase() === "del") {
                newBoxes[currentWordbox] = [...newBoxes[currentWordbox]];
                newBoxes[currentWordbox][currentLetterbox - 1] = "";
                setCurrentLetterbox(currentLetterbox - 1);
                return newBoxes;
            } else if (currentLetterbox < 5) {
                newBoxes[currentWordbox] = [...newBoxes[currentWordbox]];
                newBoxes[currentWordbox][currentLetterbox] = value;
                setCurrentLetterbox(currentLetterbox + 1);
                console.log("currentLetterBox", currentLetterbox);
                return newBoxes;
            } else {
                console.log("I have got here");
                let isReadyForNextWordbox = false;
                let _validWordArray: { [key: string]: { correct: boolean } }[] =
                    [];
                for (let i of newBoxes[currentWordbox]) {
                    let index = newBoxes[currentWordbox].indexOf(i);
                    if (checkIfValid(i)) {
                        isReadyForNextWordbox = true;

                        updateWrongOrder(currentWordbox, index, true);
                        if (
                            checkIfInRightPosition(
                                index,
                                newBoxes[currentWordbox]
                            )
                        ) {
                            updateCorrectOrder(currentWordbox, index, true);
                        } else {
                            updateCorrectOrder(currentWordbox, index, false);
                        }
                    } else {
                        updateWrongOrder(currentWordbox, index, false);
                    }
                }
                if (isReadyForNextWordbox) {
                    setCurrentLetterbox(0);
                    setCurrentWordbox(currentWordbox + 1);
                }
                return newBoxes;
                //we should check here if words are valid , keep those words and their
                //index somewhere , then check If in right position before
                //colour grading them
            }
        });
    };

    const manageGamePlay = () => {
        //get the current index to play to
        //if the word box is filled , check for correctness
        //if at least letter in word box returns a true(update word Array), then move to next word box
        //keep on repeating above process , constantly check if all return true and in right position
        //if all pass , announce win
        //if all dont pass, end game and announce loss
    };

    const checkIfValid = (letter: string) => {
        let is_valid = false;
        for (let i of SAMPLE_WORD) {
            if (i.toLowerCase() === letter.toLowerCase()) {
                is_valid = true;
            }
        }
        return is_valid;
    };
    const checkIfInRightPosition = (index: number, userWord: string[]) => {
        let isInRightPosition = false;
        if (SAMPLE_WORD[index] === userWord[index]) {
            isInRightPosition = true;
        }
        return isInRightPosition;
    };

    // To update a single value in correctOrder
    const updateCorrectOrder = (
        rowIndex: number,
        colIndex: number,
        value: boolean
    ) => {
        setCorrectOrder((prevOrder) => {
            const newOrder = [...prevOrder];
            newOrder[rowIndex] = [...newOrder[rowIndex]];
            newOrder[rowIndex][colIndex] = value;
            return newOrder;
        });
    };

    // To update an entire row in wrongOrder
    const updateWrongOrder = (
        rowIndex: number,
        colIndex: number,
        value: boolean
    ) => {
        setWrongOrder((prevOrder) => {
            const newOrder = [...prevOrder];
            newOrder[rowIndex] = [...newOrder[rowIndex]];
            newOrder[rowIndex][colIndex] = value;
            return newOrder;
        });
    };

    return (
        <div className="flex flex-col">
            <div>
                <GameTopNav />
            </div>
            <div className="bg-[#121213] px-2 py-1">
                {wordBoxes.map((wordArray, index) => (
                    <WordBox
                        wordArray={wordArray}
                        key={index}
                        correctOrderMap={correctOrder[index]}
                        wrongOrderMap={wrongOrder[index]}
                    />
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
