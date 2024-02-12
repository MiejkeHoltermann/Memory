import Lottie from "react-lottie-player";
import lottieJson from "../../../public/FanfareAnimation.json";
import Button from "./Button";

export default function WinAlert({ formattedTime, moves, restartGame }) {
  return (
    <>
      <Lottie loop animationData={lottieJson} play className="w-[80%]" />
      <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center">
        <p className="text-4xl font-bold text-center mt-[1rem]">You won ! </p>
        <p className="text-2xl text-center">Time: {formattedTime}</p>
        <p className="text-2xl text-center mb-[1rem]">Moves: {moves}</p>
        <Button
          buttonFunction={restartGame}
          functionValue={1}
          darkColor="#14532d"
          lightColor="#22c55e"
          flareColor="#bbf7d0"
          label="Restart"
        />
      </div>
    </>
  );
}
