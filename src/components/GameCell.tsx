import Lottie from "lottie-react";
import crossAnimationData from "../assets/animations/cross.json";
import circleAnimationData from "../assets/animations/oval.json";
import styles from "./TicTacToe.module.css";

type Props = {
    cell: number;
    isUser: boolean;
    isComp: boolean;
    isWinning: boolean;
    isGameOver: boolean;
    onClick: () => void;
    onUserComplete: () => void;
    onCompComplete: () => void;
};

export const GameCell = ({
         isUser,
         isComp,
         isWinning,
         isGameOver,
         onClick,
         onUserComplete,
         onCompComplete,
     }: Props) => {
    return (
        <div
            className={`${styles.field} ${isWinning ? styles.winningField : ""} ${
            isGameOver ? styles.disapearingField : ""
        }`}
    onClick={onClick}
        >
        {isUser && (
            <Lottie
                loop={false}
    animationData={crossAnimationData}
    className={styles.mark}
    onComplete={onUserComplete}
    />
)}
    {isComp && (
        <Lottie
            loop={false}
        animationData={circleAnimationData}
        className={styles.mark}
        onComplete={onCompComplete}
        />
    )}
    </div>
);
};
