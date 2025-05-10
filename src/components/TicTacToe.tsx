import { useState, useEffect, memo, useCallback } from "react";
import { GameBoard } from "./GameBoard.tsx";
import { GridAnimation } from "./GridAnimation";
import styles from "./TicTacToe.module.css";

const WINNING_COMBINATIONS: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],            // Diagonals
];

const ALL_CELLS = Array.from({ length: 9 }, (_, i) => i);

export const TicTacToe = memo(() => {
    const [userMoves, setUserMoves] = useState<number[]>([]);
    const [compMoves, setCompMoves] = useState<number[]>([]);
    const [availableCells, setAvailableCells] = useState<number[]>(ALL_CELLS);
    const [winningCombo, setWinningCombo] = useState<number[] | null>(null);
    const [isUserTurn, setIsUserTurn] = useState(true);
    const [startGame, setStartGame] = useState(false);

    const resetGame = useCallback(() => {
        setUserMoves([]);
        setCompMoves([]);
        setAvailableCells(ALL_CELLS);
        setWinningCombo(null);
        setIsUserTurn(true);
    }, []);

    const getRandomMove = useCallback((): number | null => {
        if (availableCells.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        return availableCells[randomIndex];
    }, [availableCells]);

    const isWinningMove = (moves: number[]): number[] | null => {
        return WINNING_COMBINATIONS.find(combo =>
            combo.every(cell => moves.includes(cell))
        ) || null;
    };

    const makeMove = (cell: number, isComputer: boolean) => {
        setAvailableCells(prev => prev.filter(c => c !== cell));

        if (isComputer) {
            setCompMoves(prev => [...prev, cell]);
        } else {
            setUserMoves(prev => [...prev, cell]);
        }
    };

    useEffect(() => {
        const allMovesUsed = availableCells.length === 0;
        const userWin = isWinningMove(userMoves);
        const compWin = isWinningMove(compMoves);

        if (userWin) {
            setWinningCombo(userWin);
        } else if (compWin) {
            setWinningCombo(compWin);
        } else if (allMovesUsed) {
            // Draw: highlight all cells
            setWinningCombo(ALL_CELLS);
        }
    }, [userMoves, compMoves, availableCells]);

    useEffect(() => {
        if (!winningCombo) return;
        const timeout = setTimeout(resetGame, 2000);
        return () => clearTimeout(timeout);
    }, [winningCombo, resetGame]);

    const handleUserMove = (cell: number) => {
        if (!isUserTurn || winningCombo || !availableCells.includes(cell)) return;

        makeMove(cell, false);
        setIsUserTurn(false);
    };

    useEffect(() => {
        if (isUserTurn || winningCombo) return;

        const move = getRandomMove();
        if (move !== null) {
            const delay = setTimeout(() => {
                makeMove(move, true);
                setIsUserTurn(true);
            }, 500);
            return () => clearTimeout(delay);
        }
    }, [isUserTurn, getRandomMove, winningCombo]);

    return (
        <div className={styles.gridContainer}>
            <GridAnimation onComplete={() => setStartGame(true)} />
            {startGame && (
                <GameBoard
                    userMoves={userMoves}
                    compMoves={compMoves}
                    winningCombo={winningCombo}
                    isGameOver={Boolean(winningCombo)}
                    isUserTurn={isUserTurn}
                    onCellClick={handleUserMove}
                    onUserComplete={() => {
                        const win = isWinningMove(userMoves);
                        if (!win) {
                            const move = getRandomMove();
                            if (move !== null) {
                                makeMove(move, true);
                            }
                        }
                    }}
                    onCompComplete={() => {
                        const win = isWinningMove(compMoves);
                        if (!win) {
                            setIsUserTurn(true);
                        }
                    }}
                />
            )}
        </div>
    );
});
