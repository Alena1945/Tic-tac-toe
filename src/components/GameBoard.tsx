import React from "react";
import { GameCell } from "./GameCell";
import styles from "./TicTacToe.module.css";

// Константа игрового поля
const BOARD = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
];

// Типизация props
interface GameBoardProps {
    userMoves: number[];
    compMoves: number[];
    winningCombo: number[] | null;
    isGameOver: boolean;
    isUserTurn: boolean;
    onCellClick: (cell: number) => void;
    onUserComplete: () => void;
    onCompComplete: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
        userMoves,
        compMoves,
        winningCombo,
        isGameOver,
        isUserTurn,
        onCellClick,
        onUserComplete,
        onCompComplete,
    }) => {
    return (
        <div className={styles.boardTable}>
            <div className={styles.boardBody}>
                {BOARD.map((row) =>
                    row.map((cell) => {
                        const isUser = userMoves.includes(cell);
                        const isComp = compMoves.includes(cell);
                        const isWinning = winningCombo?.includes(cell) ?? false;

                        return (
                            <GameCell
                                key={cell}
                                cell={cell}
                                isUser={isUser}
                                isComp={isComp}
                                isWinning={isWinning}
                                isGameOver={isGameOver}
                                onClick={() => {
                                    if (isUser || isComp || !isUserTurn) return;
                                    onCellClick(cell);
                                }}
                                onUserComplete={onUserComplete}
                                onCompComplete={onCompComplete}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};
