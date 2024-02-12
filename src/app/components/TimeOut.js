import Button from "./Button";

export default function TimeOut({ restartGame }) {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <p className="text-2xl text-center mb-[1rem]">Game expired</p>
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
