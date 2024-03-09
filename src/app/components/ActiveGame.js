import Image from "next/image";
import { useEffect, useState } from "react";

export default function ActiveGame({
  toggleModal,
  toggleSound,
  compareCards,
  cards,
  formattedTime,
  moves,
  pairs,
  soundOn,
}) {
  const [cardSize, setCardSize] = useState("");

  useEffect(() => {
    if (window.innerHeight >= 800 || window.innerWidth >= 450) {
      setCardSize("7.2vh");
    } else if (window.innerHeight >= 700) {
      setCardSize("8vh");
    } else {
      setCardSize("8.4vh");
    }
  }, [cards]);

  return (
    <>
      <div className="relative w-full h-[10vh]">
        {/*  Memory logo */}
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="absolute top-[2vh] left-[50%] -translate-x-1/2 max-h-[8vh] w-auto"
        />
        {/* Manual closure button */}
        <button
          onClick={() => toggleModal()}
          className="absolute top-[0.6rem] right-[1rem] text-[#fff4e6] bg-gradient-to-b from-[#301B0D] from-30% to-[#B0674B] w-[2.4rem] h-[2.4rem] rounded-[50%] flex flex-col justify-center items-center shadow-[1px_1px_4px_1px_rgba(0,0,0,0.8)]"
        >
          <div className="absolute top-[0.15rem] bg-gradient-to-b from-[#D18F77] to-70% w-[1.8rem] h-[1.6rem] rounded-[50%] z-10" />
          <Image
            src="/cross.svg"
            alt="close button"
            width={80}
            height={80}
            className="w-[1.8rem] h-[1.8rem] z-20"
          ></Image>
        </button>
        {/*  Sound on/off button */}
        <button
          onClick={() => toggleSound()}
          className="absolute top-[0.6rem] left-[1rem] text-[#fff4e6] bg-gradient-to-b from-[#301B0D] from-30% to-[#B0674B] w-[2.4rem] h-[2.4rem] rounded-[50%] flex flex-col justify-center items-center shadow-[1px_1px_4px_1px_rgba(0,0,0,0.8)]"
        >
          <div className="absolute top-[0.15rem] bg-gradient-to-b from-[#D18F77] to-70% w-[1.8rem] h-[1.6rem] rounded-[50%] z-10" />
          {soundOn ? (
            <Image
              src="/sound-on.svg"
              alt="sound on button"
              width={100}
              height={100}
              className="w-[1.6rem] h-[1.6rem]"
            ></Image>
          ) : (
            <Image
              src="/sound-off.svg"
              alt="sound off button"
              width={100}
              height={100}
              className="w-[1.6rem] h-[1.6rem]"
            ></Image>
          )}
        </button>
      </div>
      {/*  Playing field */}
      <div className="w-full h-[74vh] flex flex-column justify-center items-start">
        <div className="relative max-w-[90%] max-h-[100%] grid grid-cols-5 gap-[0.4vh] my-[2vh]">
          {cards.map((card) =>
            card.image ? (
              <button
                key={card.id}
                onClick={() => compareCards(card)}
                visible={card.visible}
                flipped={card.flipped}
                image={card.image}
                style={{
                  backgroundImage:
                    card.visible === true && card.flipped !== true
                      ? `url("/cover.svg")`
                      : card.visible === true && card.flipped === true
                      ? `url("${card.image}")`
                      : "",
                  borderWidth: card.visible && !card.flipped ? "0.15rem" : "",
                  boxShadow: card.visible ? "2px 2px 4px rgba(0,0,0,0.3)" : "",
                  height: `${cardSize}`,
                  width: `${cardSize}`,
                }}
                className={`aspect-square hover:border-[var(--rose)] rounded-[0.4rem] bg-cover flex justify-center items-center`}
              />
            ) : null
          )}
        </div>
      </div>
      {/*  User stats */}
      <div className="h-[16vh] w-full">
        <p className="text-[#4b2b1a] font-bold text-xl w-[7.6rem] h-[5vh] rounded-l-3xl flex items-center gap-[0.6rem] bg-yellow-300 absolute right-0 bottom-[9vh] shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">
          <Image
            src="/alarm.svg"
            alt="timer icon"
            width={100}
            height={100}
            className="w-[4vh] h-[4vh] ml-[0.8rem] "
          />
          {formattedTime}
        </p>
        <p className="text-[#4b2b1a] font-bold text-xl w-[7.6rem] h-[5vh] rounded-l-3xl flex items-center gap-[0.6rem] bg-yellow-300 absolute right-0 bottom-[3vh] shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">
          <Image
            src="/moves.svg"
            alt="moves icon"
            width={100}
            height={100}
            className="w-[4vh] h-[4vh] ml-[0.8rem] "
          />
          {moves}
        </p>
        {/* Deck containing pairs of cards that have already been matched */}
        <div className="absolute bottom-[2.6vh] left-[4.4vh] rotate-3 w-[10vh] h-[10vh] bg-[var(--rose)] rounded-[0.6rem] border-4 border-[#fff4e6] shadow-[-2px_2px_4px_rgba(0,0,0,0.3)]" />
        <div className="absolute bottom-[2.9vh] left-[4.1vh] -rotate-6 w-[10vh] h-[10vh] bg-[var(--rose)] rounded-[0.6rem] border-4 border-[#fff4e6] shadow-[-2px_2px_4px_rgba(0,0,0,0.3)]" />
        <p className="text-[#4b2b1a] font-bold text-[2rem] flex justify-center items-center absolute bottom-[3vh] left-[4vh] w-[10vh] h-[10vh] bg-[var(--rose)] rounded-[0.6rem] border-4 border-[#fff4e6] shadow-[-2px_2px_4px_rgba(0,0,0,0.3)]">
          {pairs}
        </p>
      </div>
    </>
  );
}
