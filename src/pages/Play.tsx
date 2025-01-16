"use client";
import { useEffect, useState } from "react";
import GameBottomNav from "../components/gameplay/GameBottomNav";
import WordBox from "../components/gameplay/WordBox";
import GameTopNav from "../components/gameplay/GameTopNav";
import WinModal from "../components/modal/WinModal";
import LoseModal from "../components/modal/LoseModal";
import Keyboard from "../components/gameplay/Keyboard";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { byteArray, cairo, CallData } from "starknet";
import { useLocation } from "react-router-dom";
import GenModal from "../components/modal/GenModal";
import useGameLogic from "../hooks/useGameLogic";

interface OutletContextType {
    account: any | null;
    handleConnectButton: () => void;
    handleClearSessionButton: () => void;
    isConnected: boolean;
    updateClassicGameAttempts: (a: string, b: number[]) => void;
}

interface GameState {
    currentWordbox: number;
    currentLetterbox: number;
    userWon: boolean;
    userLost: boolean;
    processingGuess: boolean;
    isGameDaily: boolean;
}

interface ModalState {
    winModal: boolean;
    loseModal: boolean;
    genModal: boolean;
    claimPointsLoading: boolean;
}

interface DailyGameData {
    index: number;
    id: number;
    attempts: string[];
}

const Play = () => {
    const location = useLocation();
    const { classicGameAttempts, classicGameIndex, classicGameId } =
        location.state || {};
    const { fetchUserDailyGame, fetchDailyGameId, fetchDailyGameAttempts } =
        useGameLogic();
    const { account } = useOutletContext<OutletContextType>();

    // Game state
    const [gameState, setGameState] = useState<GameState>({
        currentWordbox: 0,
        currentLetterbox: 0,
        userWon: false,
        userLost: false,
        processingGuess: false,
        isGameDaily: false,
    });

    // Modal states
    const [modalState, setModalState] = useState<ModalState>({
        winModal: false,
        loseModal: false,
        genModal: false,
        claimPointsLoading: false,
    });

    // Game data states
    const [dailyGameData, setDailyGameData] = useState<DailyGameData>({
        index: 0,
        id: 0,
        attempts: [],
    });

    const [currentWordState, setCurrentWordState] = useState([0, 0, 0, 0, 0]);
    const [vibratorsArray, setVibratorsArray] = useState<boolean[]>([]);
    const [wordBoxes, setWordBoxes] = useState<string[][]>(
        Array(6)
            .fill(null)
            .map(() => Array(5).fill(""))
    );
    const [correctOrder, setCorrectOrder] = useState<number[][]>(
        Array(6)
            .fill(null)
            .map(() => Array(5).fill(0))
    );

    const getKeyboardInput = (key: string) => {
        updateBox(key);
    };

    const updateBox = async (value: string) => {
        if (
            gameState.userWon ||
            gameState.userLost ||
            gameState.processingGuess
        ) {
            return;
        }

        if (value.toLowerCase() === "del") {
            handleDelete();
            return;
        }

        if (gameState.currentLetterbox > 4) {
            return;
        }

        // Update the current word box with the new letter
        setWordBoxes((prevBoxes) => {
            const newBoxes = [...prevBoxes];
            newBoxes[gameState.currentWordbox] = [
                ...newBoxes[gameState.currentWordbox],
            ];
            newBoxes[gameState.currentWordbox][gameState.currentLetterbox] =
                value;
            return newBoxes;
        });

        // If this completes the word
        if (gameState.currentLetterbox === 4) {
            await handleCompleteWord(value);
        } else {
            setGameState((prev) => ({
                ...prev,
                currentLetterbox: prev.currentLetterbox + 1,
            }));
        }
    };

    const handleDelete = () => {
        if (gameState.currentLetterbox === 0) return;

        setWordBoxes((prevBoxes) => {
            const newBoxes = [...prevBoxes];
            newBoxes[gameState.currentWordbox] = [
                ...newBoxes[gameState.currentWordbox],
            ];
            newBoxes[gameState.currentWordbox][gameState.currentLetterbox - 1] =
                "";
            return newBoxes;
        });

        setGameState((prev) => ({
            ...prev,
            currentLetterbox: prev.currentLetterbox - 1,
        }));
    };

    const handleCompleteWord = async (lastLetter: string) => {
        setGameState((prev) => ({ ...prev, processingGuess: true }));

        const currentWord = [
            ...wordBoxes[gameState.currentWordbox],
            lastLetter,
        ];
        const wordString = currentWord.join("");

        try {
            const newWordState = await getWordState(wordString);
            setCurrentWordState(newWordState);
            console.log(currentWordState);
            updateCorrectOrder(gameState.currentWordbox, newWordState);

            const newVibrators = generateVibrators(newWordState);
            setVibratorsArray(newVibrators);
            console.log(vibratorsArray);

            const status = checkAllValid(newWordState);

            // Save attempt based on game type
            if (gameState.isGameDaily) {
                await saveUserDailyAttempt(wordString);
            } else {
                await saveUserClassicAttempt(wordString);
            }

            handleWordStatus(status);
        } catch (error) {
            console.error("Error processing word:", error);
        } finally {
            setGameState((prev) => ({ ...prev, processingGuess: false }));
        }
    };

    const handleWordStatus = (status: string) => {
        if (status === "won") {
            setGameState((prev) => ({ ...prev, userWon: true }));
            setModalState((prev) => ({ ...prev, winModal: true }));
            return;
        }

        if (status !== "won" && gameState.currentWordbox === 5) {
            setGameState((prev) => ({ ...prev, userLost: true }));
            setModalState((prev) => ({ ...prev, loseModal: true }));
            return;
        }

        // Move to next word if not won
        setGameState((prev) => ({
            ...prev,
            currentWordbox: prev.currentWordbox + 1,
            currentLetterbox: 0,
        }));
    };

    const checkAllValid = (currentWordState: number[]) => {
        const total = currentWordState.reduce((sum, val) => sum + val, 0);
        if (total === 0) return "fail";
        if (total === 10) return "won";
        return "pass";
    };

    const updateCorrectOrder = (rowIndex: number, newWordState: number[]) => {
        setCorrectOrder((prevOrder) => {
            const newOrder = [...prevOrder];
            newOrder[rowIndex] = [...newWordState];
            return newOrder;
        });
    };

    const generateVibrators = (wordState: number[]) => {
        return wordState.map((state) => state === 0);
    };

    const getWordState = async (word: string) => {
        if (word.length !== 5) {
            return [0, 0, 0, 0, 0];
        }

        const gameIndex = gameState.isGameDaily
            ? dailyGameData.index
            : classicGameIndex;

        try {
            const response = await axios.post(
                "https://tweetle-bot-backend.onrender.com/game",
                {
                    word: word.toLowerCase(),
                    i: Number(gameIndex),
                    tg_id: "2200639342",
                },
                {
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                }
            );

            return response.data.data;
        } catch (error: any) {
            console.error("Error getting word state:", error);
            return [0, 0, 0, 0, 0];
        }
    };

    const saveUserClassicAttempt = async (word: string) => {
        if (word.length > 5) return;

        const calls = [
            {
                contractAddress:
                    "0x974d27dbf588cd1a581722921906d03b552d64107264d599e06c97b28e848e",
                entrypoint: "save_Player_classic_attempt",
                calldata: CallData.compile({
                    _game_id: Number(classicGameId),
                    _word: byteArray.byteArrayFromString(word),
                }),
            },
        ];

        try {
            const call = await account?.getOutsideExecutionPayload({ calls });

            const response = await fetch(
                "https://tweetle-bot-backend.onrender.com/player/execute-outside",
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(call),
                }
            );

            return await response.json();
        } catch (error) {
            console.error("Error saving classic attempt:", error);
        }
    };

    const saveUserDailyAttempt = async (word: string) => {
        if (word.length > 5) return;

        const calls = [
            {
                contractAddress:
                    "0x974d27dbf588cd1a581722921906d03b552d64107264d599e06c97b28e848e",
                entrypoint: "save_player_daily_attempt",
                calldata: CallData.compile({
                    _word: byteArray.byteArrayFromString(word),
                    _points: cairo.uint256(1),
                }),
            },
        ];

        try {
            const call = await account?.getOutsideExecutionPayload({ calls });

            const response = await fetch(
                "https://tweetle-bot-backend.onrender.com/player/execute-outside",
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(call),
                }
            );

            return await response.json();
        } catch (error) {
            console.error("Error saving daily attempt:", error);
        }
    };

    const processExistingAttempts = async (attempts: string[]) => {
        for (let i = 0; i < attempts.length; i++) {
            if (attempts[i].length > 5) continue;

            const arrayColorCode = await getWordState(attempts[i]);
            updateCorrectOrder(gameState.currentWordbox, arrayColorCode);

            setWordBoxes((prevBoxes) => {
                const newBoxes = [...prevBoxes];
                newBoxes[gameState.currentWordbox] = attempts[i].split("");
                return newBoxes;
            });

            setGameState((prev) => ({
                ...prev,
                currentWordbox: prev.currentWordbox + 1,
            }));
        }
    };

    // Modal handlers
    const closeModal = () => {
        setModalState((prev) => ({
            ...prev,
            winModal: false,
            loseModal: false,
        }));
    };

    const claimHandler = () => {
        setModalState((prev) => ({
            ...prev,
            claimPointsLoading: true,
        }));
    };

    useEffect(() => {
        let isMounted = true;

        const initializeGame = async () => {
            try {
                setModalState((prev) => ({ ...prev, genModal: true }));

                // Initialize game type and data
                if (
                    !classicGameAttempts &&
                    !classicGameIndex &&
                    !classicGameId
                ) {
                    const dailyGame = await fetchUserDailyGame();
                    const dailyId = await fetchDailyGameId();
                    const dailyAttempts = await fetchDailyGameAttempts(
                        Number(dailyId)
                    );

                    if (isMounted) {
                        setGameState((prev) => ({
                            ...prev,
                            isGameDaily: true,
                        }));
                        setDailyGameData({
                            index: Number(dailyGame.word_index),
                            id: Number(dailyId),
                            attempts: dailyAttempts,
                        });
                    }
                }

                // Process existing attempts
                const attempts = gameState.isGameDaily
                    ? dailyGameData.attempts
                    : classicGameAttempts;
                if (attempts?.length > 0) {
                    await processExistingAttempts(attempts);
                }
            } catch (error) {
                console.error("Game initialization error:", error);
            } finally {
                if (isMounted) {
                    setModalState((prev) => ({ ...prev, genModal: false }));
                }
            }
        };

        initializeGame();
        return () => {
            isMounted = false;
        };
    }, []);

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
                            isLoading={gameState.processingGuess}
                        />
                    ))}
                </div>
                <div className="bg-black pb--1">
                    <div className="mt-2">
                        <Keyboard clickHandler={getKeyboardInput} />
                    </div>
                    <div className="mt-2">
                        <GameBottomNav
                            submitHandler={() => {}}
                            isEnded={gameState.userWon}
                        />
                    </div>
                </div>
            </div>
            {modalState.winModal && (
                <WinModal
                    cancelHandler={closeModal}
                    claimHandler={claimHandler}
                    loadingState={modalState.claimPointsLoading}
                />
            )}
            {modalState.loseModal && (
                <LoseModal
                    cancelHandler={closeModal}
                    claimHandler={claimHandler}
                    loadingState={modalState.claimPointsLoading}
                />
            )}
            {modalState.genModal && <GenModal />}
        </div>
    );
};

export default Play;
