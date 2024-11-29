"use client";
import { useState } from "react";
import GameBottomNav from "../components/gameplay/GameBottomNav";
import { Contract, cairo, AccountInterface } from "starknet";
import gameAbi from "../utils/gameAbi.json";

import { SessionAccountInterface } from "@argent/tma-wallet";

import WordBox from "../components/gameplay/WordBox";
import GameTopNav from "../components/gameplay/GameTopNav";
import WinModal from "../components/modal/WinModal";
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
    const [claimPointsLoading, setClaimPointsLoading] = useState(false);

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
        setCurrentLetterbox(currentLetterbox + 1);
        setWordBoxes((prevBoxes) => {
            const newBoxes = [...prevBoxes];
            if (value.toLowerCase() === "del") {
                newBoxes[currentWordbox] = [...newBoxes[currentWordbox]];
                newBoxes[currentWordbox][currentLetterbox - 1] = "";
                setCurrentLetterbox(currentLetterbox - 1);
                return newBoxes;
            } else if (currentLetterbox < 4) {
                newBoxes[currentWordbox] = [...newBoxes[currentWordbox]];
                newBoxes[currentWordbox][currentLetterbox] = value;

                console.log("currentLetterBox", currentLetterbox);
                return newBoxes;
            } else {
                newBoxes[currentWordbox] = [...newBoxes[currentWordbox]];
                newBoxes[currentWordbox][currentLetterbox] = value;
                console.log("I have got here");

                let hasUserWon = manageGamePlay(newBoxes[currentWordbox]);
                setUserWon(hasUserWon);

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
    //get the current index to play to
    //if the word box is filled , check for correctness
    //if at least letter in word box returns a true(update word Array), then move to next word box
    //keep on repeating above process , constantly check if all return true and in right position
    //if all pass , announce win
    //if all dont pass, end game and announce loss
    const manageGamePlay = (currentWord: string[]) => {
        let isAllValid = true;
        for (let i in currentWord) {
            let isRight = checkIfInRightPosition(Number(i), currentWord);
            if (!isRight) {
                isAllValid = isRight;
            }
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
    // MODAL FUNCTIONS
    const closeModal = () => setUserWon(false);

    const claimHandler = () => {
        setClaimPointsLoading(true);
    };

    const handleCliamRewards = async () => {
        const { account } = useOutletContext<OutletContextType>();

        const game_addr =
            "0x03891b46cdd780984a4954a3d54d00051ee761e068b56274c0762dfe80d7d4d9";

        const gameContract = new Contract(gameAbi, game_addr, account);

        setClaimPointsLoading(true);
        //    try {

        await gameContract.claimPoints(Number(2));

        setClaimPointsLoading(false);

        //    } catch (error: any) {
        //         setClaimPointsLoading(false);
        //    }
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
            </div>
            {userWon && (
                <WinModal
                    cancelHandler={closeModal}
                    claimHandler={claimHandler}
                    loadingState={claimPointsLoading}
                />
            )}
        </div>
    );
};

export default Play;
