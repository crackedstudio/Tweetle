"use client";
import { useState } from "react";
import GameBottomNav from "../components/gameplay/GameBottomNav";
import { Contract, cairo, AccountInterface } from "starknet";
import gameAbi from "../utils/gameAbi.json";

import { SessionAccountInterface } from "@argent/tma-wallet";

import WordBox from "../components/gameplay/WordBox";
import GameTopNav from "../components/gameplay/GameTopNav";
import WinModal from "../components/modal/WinModal";
import LoseModal from "../components/modal/LoseModal";
import Keyboard from "../components/gameplay/Keyboard";
import { useOutletContext } from "react-router-dom";
const SAMPLE_WORD = ["C", "O", "V", "I", "D"];

interface OutletContextType {
    account: any | null;
    handleConnectButton: () => void;
    handleClearSessionButton: () => void;
    isConnected: boolean;
}

const Play = () => {
    const [currentWordbox, setCurrentWordbox] = useState(0);
    const [currentLetterbox, setCurrentLetterbox] = useState(0);
    const [userWon, setUserWon] = useState(false);
    const [userLost, setUserLost] = useState(false);
    const [winModal, setWinModal] = useState(false);
    const [loseModal, setLoseModal] = useState(false);
    const [claimPointsLoading, setClaimPointsLoading] = useState(false);
    const [vibratorsArray, setVibratorsArray] = useState<boolean[]>([]);

    const [processingGuess, setProcessingGuess] = useState(false);

    const initialOrder = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];

    const [correctOrder, setCorrectOrder] = useState<number[][]>(initialOrder);

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
        // setCurrentLetterbox(currentLetterbox + 1);
        setWordBoxes((prevBoxes) => {
            const newBoxes = [...prevBoxes];
            if (userWon || userLost) {
                return newBoxes;
            }
            if (value.toLowerCase() === "del") {
                if (currentLetterbox === 0) {
                    return newBoxes;
                }
                newBoxes[currentWordbox] = [...newBoxes[currentWordbox]];
                newBoxes[currentWordbox][currentLetterbox - 1] = "";
                setCurrentLetterbox(currentLetterbox - 1);
                return newBoxes;
            } else if (currentLetterbox < 4) {
                setCurrentLetterbox(currentLetterbox + 1);
                newBoxes[currentWordbox] = [...newBoxes[currentWordbox]];
                newBoxes[currentWordbox][currentLetterbox] = value;

                console.log("currentLetterBox", currentLetterbox);
                return newBoxes;
            } else {
                setCurrentLetterbox(currentLetterbox + 1);
                if (currentLetterbox > 4) {
                    setCurrentLetterbox(currentLetterbox);
                    return newBoxes;
                }
                newBoxes[currentWordbox] = [...newBoxes[currentWordbox]];
                newBoxes[currentWordbox][currentLetterbox] = value;

                //UPDATE THE PROCESS GUESS HERE
                handleProcessGuess(newBoxes[currentWordbox]);

                console.log("I have got here");

                const currentWordState = getWordState(newBoxes[currentWordbox]);
                console.log("current word state is --__--", currentWordState);
                updateCorrectOrder(currentWordbox, currentWordState);
                //get Vibrating boxes
                const _vibratorsArray = generateVibrators(currentWordState);
                setVibratorsArray(_vibratorsArray);

                let status = checkAllValid(currentWordState);
                console.log("current status is --__--", status);
                let isReadyForNextWordbox = true;

                if (status == "won") {
                    setUserWon(true);
                    setWinModal(true);
                }

                if (status === "fail") isReadyForNextWordbox = false;

                if (status === "pass" && currentWordbox === 5) {
                    isReadyForNextWordbox = false;
                    setLoseModal(true);
                    setUserLost(true);
                    return newBoxes;
                }

                console.log("is ready for next wordbox", isReadyForNextWordbox);

                if (isReadyForNextWordbox) {
                    setCurrentLetterbox(0);
                    setCurrentWordbox(currentWordbox + 1);
                } else {
                    return newBoxes;
                }

                return newBoxes;
                //we should check here if words are valid , keep those words and their
                //index somewhere , then check If in right position before
                //colour grading them
            }
        });
    };
    //get the current index to play to
    //if the word box is filled , check for correctness
    //if at least letter in word box returns a true(update word Array), then move to next word box
    //keep on repeating above process , constantly check if all return true and in right position
    //if all pass , announce win
    //if all dont pass, end game and announce loss
    const checkAllValid = (currentWordState: number[]) => {
        let isAllValid = "";
        let total = 0;

        for (let i of currentWordState) {
            total += i;
        }
        if (total === 0) {
            isAllValid = "fail";
        } else if (total === 10) {
            isAllValid = "won";
        } else {
            isAllValid = "pass";
        }

        return isAllValid;
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
    const updateCorrectOrder = (rowIndex: number, newWordState: number[]) => {
        setCorrectOrder((prevOrder) => {
            const newOrder = [...prevOrder];
            newOrder[rowIndex] = [...newWordState];

            return newOrder;
        });
    };

    // MODAL FUNCTIONS
    const closeModal = () => {
        setWinModal(false);
        setLoseModal(false);
    };

    const claimHandler = () => {
        setClaimPointsLoading(true);
    };

    const handleProcessGuess = async (wordArray: string[]) => {
        const { account } = useOutletContext<OutletContextType>();

        const game_addr =
            "0x04eb427210848b943c4ff67c9c43ddd2187e3e785e6d5efec15e7eec593ee367";

        const gameContract = new Contract(gameAbi, game_addr, account);

        setProcessingGuess(true);
        try {
            const returnVal = await gameContract.process_guess(
                0,
                convertWordArrayToString(wordArray)
            );
            console.log("return VALUE is ----------", returnVal);
            setProcessingGuess(false);
        } catch (error: any) {
            setProcessingGuess(false);
        }
    };

    const convertWordArrayToString = (wordArray: string[]) => {
        let string = "";
        for (let letter of wordArray) {
            string += letter;
        }
        return string;
    };

    // A FUNCTION THAT SEARCHES TO RETURN THE ARRRAY EQUIV STATE OF THE USER INPUT
    const getWordState = (word: string[]) => {
        let _returnArray = [0, 0, 0, 0, 0];
        for (let i in word) {
            if (checkIfValid(word[i])) {
                _returnArray[i] = 1;
            }
            if (checkIfInRightPosition(Number(i), word)) {
                _returnArray[i] = 2;
            }
        }
        return _returnArray;
    };

    const generateVibrators = (_wordState: number[]) => {
        const _vibrators = _wordState.map((state) => {
            if (state != 0) {
                return false;
            }
            return true;
        });
        return _vibrators;
    };

    return (
        <div>
            <div className="flex flex-col">
                <div>
                    <GameTopNav />
                </div>
                <div className="bg-[#121213] px-2 py-1">
                    {wordBoxes.map((wordArray, index) => (
                        <WordBox
                            wordArray={wordArray}
                            key={index}
                            wordState={correctOrder[index]}
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
            </div>
            {winModal && (
                <WinModal
                    cancelHandler={closeModal}
                    claimHandler={claimHandler}
                    loadingState={claimPointsLoading}
                />
            )}
            {loseModal && (
                <LoseModal
                    cancelHandler={closeModal}
                    claimHandler={claimHandler}
                    loadingState={claimPointsLoading}
                />
            )}
        </div>
    );
};

export default Play;
