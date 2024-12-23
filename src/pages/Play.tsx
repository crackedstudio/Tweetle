"use client";
import { useState } from "react";
import GameBottomNav from "../components/gameplay/GameBottomNav";
import { Contract, cairo, AccountInterface, CallData, Provider } from "starknet";
import gameAbi from "../utils/gameAbi.json";
import vrfAbi from "../utils/vrfAbi.json"

import { SessionAccountInterface } from "@argent/tma-wallet";

import WordBox from "../components/gameplay/WordBox";
import GameTopNav from "../components/gameplay/GameTopNav";
import WinModal from "../components/modal/WinModal";
import LoseModal from "../components/modal/LoseModal";
import Keyboard from "../components/gameplay/Keyboard";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { source } from "framer-motion/client";
const SAMPLE_WORD = ["C", "O", "V", "I", "D"];

interface OutletContextType {
    account: any | null;
    handleConnectButton: () => void;
    handleClearSessionButton: () => void;
    isConnected: boolean;
}

const Play = () => {
    const { account } = useOutletContext<OutletContextType>();

    const [currentWordbox, setCurrentWordbox] = useState(0);
    const [currentLetterbox, setCurrentLetterbox] = useState(0);
    const [userWon, setUserWon] = useState(false);
    const [userLost, setUserLost] = useState(false);
    const [winModal, setWinModal] = useState(false);
    const [loseModal, setLoseModal] = useState(false);
    const [claimPointsLoading, setClaimPointsLoading] = useState(false);
    const [vibratorsArray, setVibratorsArray] = useState<boolean[]>([]);

    const [currentWordState, setCurrentWordState] = useState([0, 0, 0, 0, 0]);

    const [processingGuess, setProcessingGuess] = useState(false);
    const [gottenData, setGottenData] = useState(false);
    // const [fetchingRecentPlay, setFetchingRecentPlay] = useState(false);

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

    const updateBox = async (value: string) => {
        // setCurrentLetterbox(currentLetterbox + 1);
        if (currentLetterbox >= 4) {
            const _word = convertWordArrayToString(wordBoxes[currentWordbox]);
            const _currentWordState = await getWordState(_word);
            setCurrentWordState(_currentWordState);
        }

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

                console.log("I have got here");

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
            //  let _currentWordState: number[];
            //  if (currentLetterbox == 4 && value !== "del") {
            //      let _currentWordBox = wordBoxes[currentWordbox];
            //      _currentWordBox.push(value);
            //      await handleProcessGuess(_currentWordBox);
            //      _currentWordState = await handleFetchRecentPlay();
            //  }
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

    // const checkIfValid = (letter: string) => {
    //     let is_valid = false;
    //     for (let i of SAMPLE_WORD) {
    //         if (i.toLowerCase() === letter.toLowerCase()) {
    //             is_valid = true;
    //         }
    //     }
    //     return is_valid;
    // };
    // const checkIfInRightPosition = (index: number, userWord: string[]) => {
    //     let isInRightPosition = false;
    //     if (SAMPLE_WORD[index] === userWord[index]) {
    //         isInRightPosition = true;
    //     }
    //     return isInRightPosition;
    // };

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

    const submitHandler = async () => {
        // await handleProcessGuess(wordBoxes[currentWordbox]);
        // await handleFetchRecentPlay();
    };

    // const handleFetchRecentPlay = async () => {
    //     const game_addr =
    //         "0x03c9952e2a146c4aa9d327527416b1a448587d7a839f343ff73997e156e2d4dd";
    //     const gameContract = new Contract(gameAbi, game_addr, account);
    //     setFetchingRecentPlay(true);
    //     alert("about to start fetching");
    //     let _updatedWordState = [];
    //     try {
    //         alert("fetching now ");
    //         const returnVal = await gameContract.get_user_recent_play(
    //             account?.address,
    //             1
    //         );
    //         console.log("return VALUE is ----------", returnVal);
    //         _updatedWordState.push(returnVal.first);
    //         _updatedWordState.push(returnVal.second);
    //         _updatedWordState.push(returnVal.third);
    //         _updatedWordState.push(returnVal.fourth);
    //         _updatedWordState.push(returnVal.fifth);
    //         alert(_updatedWordState);
    //         alert("successful");
    //         setFetchingRecentPlay(false);
    //         return _updatedWordState;
    //     } catch (error: any) {
    //         setFetchingRecentPlay(false);
    //         alert("failll" + error);
    //         return [0, 0, 0, 0, 0];
    //     }
    // };

    // const handleProcessGuess = async (wordArray: string[]) => {
    //     const game_addr =
    //         "0x03c9952e2a146c4aa9d327527416b1a448587d7a839f343ff73997e156e2d4dd";
    //     const gameContract = new Contract(gameAbi, game_addr, account);
    //     setProcessingGuess(true);

    //     try {
    //         alert("trying now ");
    //         alert(convertWordArrayToString(wordArray));
    //         const returnVal = await gameContract.process_guess(1, "vivid");
    //         console.log("return VALUE is ----------", returnVal);
    //         alert(JSON.stringify(returnVal));
    //         alert("successful");
    //         setProcessingGuess(false);
    //     } catch (error: any) {
    //         setProcessingGuess(false);
    //         alert("failll" + error);
    //     }
    // };

    const handleCreateNewGame = async () => {

        const game_addr =
            "0x06c9091b88d7e8f988f76a28468345c3bdcef0b6bb155fbe5d42e411bda2a6de";

        const vrf_addr = '0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f';
        const gameContract = new Contract(gameAbi, game_addr, account);
        const vrfContract = new Contract(vrfAbi, vrf_addr, account);

        try {
            if (!account) {
                return;
              }
              await vrfContract.connect(account);
            const call = await account?.execute([
                {
                    contractAddress: '0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f',
                    entrypoint: 'request_random',
                    calldata: CallData.compile({
                      caller: game_addr,
                      source: {type: 0, address: account?.address},
                    }),
                },
                // {
                //     contractAddress: '0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f',
                //     entrypoint: 'consume_random',
                //     calldata: CallData.compile({
                //         source: {type: 0, address: account?.address}
                //     })
                // }, 
                {
                    contractAddress: '0x06c9091b88d7e8f988f76a28468345c3bdcef0b6bb155fbe5d42e411bda2a6de',
                    entrypoint: 'create_new_game',
                }
            ])

            if(!call) {
                return
              }

            await account.waitForTransaction(call.transaction_hash);

            alert(call.transaction_hash)

        } catch (error) {
            alert(error)
        }
    }

    const convertWordArrayToString = (wordArray: string[]) => {
        let string = "";
        for (let letter of wordArray) {
            string += letter;
        }
        return string;
    };
    // A function that collects user input to return the array equivalent

    const getWordState = async (word: string) => {
        setProcessingGuess(true);

        if (word.length !== 5) {
            setProcessingGuess(false);
            return [0, 0, 0, 0, 0];
        }

        try {
            alert("word is ____" + word);

            // Using fetch to make the POST request
            const response = await fetch(
                "https://tweetle-bot-backend.onrender.com/game",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Set the content type to JSON
                    },
                    body: JSON.stringify({ word: word.toLowerCase() }), // Send the word as JSON
                }
            );

            if (!response.ok) {
                // If response is not OK (status code outside 2xx)
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json(); // Parse the response JSON
            setProcessingGuess(false);
            return data;
        } catch (err: any) {
            setProcessingGuess(false);

            // Handle errors and display relevant message
            alert(`Error occurred: ${err.message}`);
            return [0, 0, 0, 0, 0]; // Return the default value on error
        }
    };

    //A FUNCTION THAT SEARCHES TO RETURN THE ARRRAY EQUIV STATE OF THE USER INPUT
    // const getWordState = (word: string[]) => {
    //     let _returnArray = [0, 0, 0, 0, 0];
    //     for (let i in word) {
    //         if (checkIfValid(word[i])) {
    //             _returnArray[i] = 1;
    //         }
    //         if (checkIfInRightPosition(Number(i), word)) {
    //             _returnArray[i] = 2;
    //         }
    //     }
    //     return _returnArray;
    // };

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
                <button onClick={handleCreateNewGame}>click</button>
                <div>
                    <GameTopNav />
                </div>
                <div className="bg-[#121213] px-2 py-1">
                    {wordBoxes.map((wordArray, index) => (
                        <WordBox
                            wordArray={wordArray}
                            key={index}
                            wordState={correctOrder[index]}
                            isLoading={processingGuess}
                        />
                    ))}
                </div>
                <div className="bg-black pb--1">
                    <div className="mt-2">
                        <Keyboard clickHandler={getKeyboardInput} />
                    </div>
                    <div className="mt-2">
                        <GameBottomNav
                            submitHandler={submitHandler}
                            isEnded={userWon}
                        />
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
