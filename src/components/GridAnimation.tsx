import Lottie from "lottie-react";
import gridAnimationData from "../assets/animations/grid.json";

export const GridAnimation = ({ onComplete }: { onComplete: () => void }) => (
    <Lottie loop={false} animationData={gridAnimationData} onComplete={onComplete} />
);