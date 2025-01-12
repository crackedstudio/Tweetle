"use client";
import { useState } from "react";
import GameBottomNav from "../components/gameplay/GameBottomNav";
import WordBox from "../components/gameplay/WordBox";
import GameTopNav from "../components/gameplay/GameTopNav";
import WinModal from "../components/modal/WinModal";
import LoseModal from "../components/modal/LoseModal";
import Keyboard from "../components/gameplay/Keyboard";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
// import { CallData } from "starknet";

interface OutletContextType {
    account: any | null;
    handleConnectButton: () => void;
    handleClearSessionButton: () => void;
    isConnected: boolean;
    currentGameIndex: number;
}

const Play = () => {
    const { currentGameIndex } = useOutletContext<OutletContextType>();

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
    // const [gottenData, setGottenData] = useState(false);
    // const [isCurrentWordBoxFull, setIsCurrentWordBoxFull] = useState(false);
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
        if (userWon || userLost) {
            return;
        }

        if (value.toLowerCase() === "del") {
            if (currentLetterbox === 0) {
                return;
            }
            setWordBoxes((prevBoxes) => {
                const newBoxes = [...prevBoxes];
                newBoxes[currentWordbox] = [...newBoxes[currentWordbox]];
                newBoxes[currentWordbox][currentLetterbox - 1] = "";
                return newBoxes;
            });
            setCurrentLetterbox((prev) => prev - 1);
            return;
        }

        // Don't process more input if we're already at max letters
        if (currentLetterbox > 4) {
            return;
        }

        setWordBoxes((prevBoxes) => {
            const newBoxes = [...prevBoxes];
            newBoxes[currentWordbox] = [...newBoxes[currentWordbox]];
            newBoxes[currentWordbox][currentLetterbox] = value;
            return newBoxes;
        });

        // If this input completes the word
        if (currentLetterbox === 4) {
            const updatedWord = [...wordBoxes[currentWordbox], value];
            const wordString = convertWordArrayToString(updatedWord);

            try {
                const _currentWordState = await getWordState(wordString);
                setCurrentWordState(_currentWordState);

                console.log("curenr word state is ---", currentWordState);
                updateCorrectOrder(currentWordbox, _currentWordState);

                const _vibratorsArray = generateVibrators(_currentWordState);
                setVibratorsArray(_vibratorsArray);

                console.log("vibrators Array is ---", vibratorsArray);

                const status = checkAllValid(_currentWordState);

                if (status === "won") {
                    setUserWon(true);
                    setWinModal(true);
                    return;
                }

                if (status === "fail") {
                    return;
                }

                if (status === "pass" && currentWordbox === 5) {
                    setLoseModal(true);
                    setUserLost(true);
                    return;
                }

                // Move to next word if the guess was valid
                if (status === "pass") {
                    setCurrentLetterbox(0);
                    setCurrentWordbox((prev) => prev + 1);
                    return;
                }
            } catch (error) {
                console.error("Error processing word:", error);
            }
        } else {
            setCurrentLetterbox((prev) => prev + 1);
        }
    };

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
            const response = await axios.post(
                "https://tweetle-bot-backend.onrender.com/game",
                {
                    word: word.toLowerCase(),
                    i: currentGameIndex,
                },
                {
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                }
            );

            setProcessingGuess(false);
            alert(response.data.message);
            console.log("RESPONSES>DATA>>>", response.data);

            return response.data.data;
        } catch (err: any) {
            setProcessingGuess(false);

            // Log the detailed error message
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("Response data:", err.response.data);
                console.log("Response status:", err.response.status);
                console.log("Response headers:", err.response.headers);
                alert(`Server responded with error: ${err.response.status}`);
                return [0, 0, 0, 0, 0];
            } else if (err.request) {
                // The request was made but no response was received
                console.log("Request:", err.request);
                alert("No response from server. Possible network error.");
                return [0, 0, 0, 0, 0];
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error message:", err.message);
                alert(`Error: ${err.message}`);
                return [0, 0, 0, 0, 0];
            }
        }
    };

    // const handleOutsideExecution = async () => {
    //     let calls = [
    //         {
    //             contractAddress:
    //                 "0x014348d668e199e0222d2a58d80c04821b9dddb00c5946d1282d415a448227c9",
    //             entrypoint: "register_player",
    //             calldata: CallData.compile({
    //                 _tg_id: "123567",
    //             }),
    //         },
    //     ];

    //     console.log("sent");

    //     let call = await account?.getOutsideExecutionPayload({ calls });

    //     console.log(call);

    //     const response = await fetch(
    //         "https://tweetle-bot-backend.onrender.com/player/execute-outside",
    //         {
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //             },
    //             method: "POST",
    //             body: JSON.stringify(call),
    //         }
    //     );

    //     console.log("fetch");

    //     let result = await response.json();

    //     console.log(result);
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
