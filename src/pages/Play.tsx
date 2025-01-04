"use client";
import { useState } from "react";
import GameBottomNav from "../components/gameplay/GameBottomNav";
import {
    Contract,
    cairo,
    AccountInterface,
    CallData,
    Provider,
} from "starknet";
import gameAbi from "../utils/gameAbi.json";
import vrfAbi from "../utils/vrfAbi.json";

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
    const [isCurrentWordBoxFull, setIsCurrentWordBoxFull] = useState(false);
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
                updateCorrectOrder(currentWordbox, _currentWordState);

                const _vibratorsArray = generateVibrators(_currentWordState);
                setVibratorsArray(_vibratorsArray);

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

    const handleSavePlayerGuess = async () => {
        const game_addr =
            "0x043eb60dc59822103668738df135b407a639d4abbeef95afe0949a3df8f7b802";
        const gameContract = new Contract(gameAbi, game_addr, account);

        let calls = [
            {
                to:
                    "0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f",
                selector: "request_random",
                calldata: CallData.compile({
                    caller: game_addr,
                    source: { type: 0, address: account?.address },
                }),
            },
            {
                to: game_addr,
                selector: "random_number",
                calldata: CallData.compile({
                    _num: 0,
                }),
            },
        ]

        try {
            if (!account) {
                return;
            }
            await gameContract.create_instant_game(calls);
        } catch (err) {
            console.log(err);
            alert(err)
        }
    };

    const handleFetchUserGames = async () => {
        const game_addr =
            "0x033ccdb04e78933097705e1847779f59db1c868f4da503c87d5a776854256fca";
        const gameContract = new Contract(gameAbi, game_addr, account);

        try {
            if (!account) {
                return;
            }
            const _playerGames = await gameContract.get_player_games(
                account.address
            );
            alert("player games is _______" + _playerGames);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCreateNewGame = async () => {
        const game_addr =
            '0x6726494f5ced7684652a23fac3754338f0ef3f399e7bd004d57c9a4a7ca9ba1';
        // 0x033ccdb04e78933097705e1847779f59db1c868f4da503c87d5a776854256fca;

        const vrf_addr =
            '0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f';
        const gameContract = new Contract(gameAbi, game_addr, account);
        const vrfContract = new Contract(vrfAbi, vrf_addr, account);

        // 0x003b7234057f3cd7622d2d8203861dcfe013c475bc06413c312d5b36645845b6
        try {
            if (!account) {
                return;
            }
            gameContract.connect(account);
            const call = await account?.execute([
                {
                    contractAddress:
                        '0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f',
                    entrypoint: 'request_random',
                    calldata: CallData.compile({
                        caller: game_addr,
                        source: {type: 0, address: account?.address}
                    }),
                },
                {
                    contractAddress: game_addr,
                    entrypoint: 'create_new_game',
                    calldata: CallData.compile({
                        _player_id: account?.address,
                    }),
                },
                // {
                //     contractAddress: game_addr,
                //     entrypoint: 'random_number',
                //     calldata: CallData.compile({
                //         _num: cairo.uint256('500'),
                //     }),
                // },
            ]);

            if (!call) {
                return new Error('call not made !!');
            }

            await account.waitForTransaction(call.transaction_hash);

            alert(call.transaction_hash);
        } catch (error) {
            console.log(error)
            alert(error);
        }
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
            } else if (err.request) {
                // The request was made but no response was received
                console.log("Request:", err.request);
                alert("No response from server. Possible network error.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error message:", err.message);
                alert(`Error: ${err.message}`);
            }
        }
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
