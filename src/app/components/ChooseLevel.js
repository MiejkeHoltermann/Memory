import Image from "next/image";
import Button from "./Button";

export default function ChooseLevel({ startGame }) {
  return (
    <>
      {/*  Memory logo */}
      <div className="relative w-full h-[8rem] ">
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="absolute top-[3rem] left-[50%] -translate-x-1/2"
        />
      </div>
      <p>Choose your level</p>
      <Button
        buttonFunction={startGame}
        functionValue={10}
        darkColor="#7f1d1d"
        lightColor="#ef4444"
        flareColor="#fecaca"
        label="Easy"
      />
      <Button
        buttonFunction={startGame}
        functionValue={20}
        darkColor="#713f12"
        lightColor="#eab308"
        flareColor="#fef08a"
        label="Medium"
      />
      <Button
        buttonFunction={startGame}
        functionValue={30}
        darkColor="#831843"
        lightColor="#f43f5e"
        flareColor="#fecdd3"
        label="Hard"
      />
      <Button
        buttonFunction={startGame}
        functionValue={40}
        darkColor="#134e4a"
        lightColor="#14b8a6"
        flareColor="#99f6e4"
        label="Insane"
      />
    </>
  );
}
