"use client";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import useSound from "use-sound";
import Modal from "./components/Modal";
import ChooseLevel from "./components/ChooseLevel";
import ActiveGame from "./components/ActiveGame";
import WinAlert from "./components/WinAlert";
import TimeOut from "./components/TimeOut";

export default function Home() {
  const [gameStatus, setGameStatus] = useLocalStorageState("gameStatus", {
    defaultValue: "chooseLevel",
  });
  const [pairs, setPairs] = useLocalStorageState("pairs", { defaultValue: 0 });
  const [cards, setCards] = useLocalStorageState("cards", { defaultValue: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [timer, setTimer] = useLocalStorageState("timer", { defaultValue: 0 });
  const [moves, setMoves] = useLocalStorageState("moves", { defaultValue: 0 });
  const [playClickSound] = useSound("/sounds/click.mp3");
  const [playSuccessSound] = useSound("/sounds/success.mp3");
  const [playFanfareSound] = useSound("/sounds/fanfare.mp3");
  const [soundOn, setSoundOn] = useLocalStorageState("soundOn", {
    defaultValue: true,
  }); // generates a new set of cards for the memory game

  function shuffleCards(number) {
    const newCards = [];
    for (let i = 1; i <= number; i++) {
      newCards.push({
        id: i, // every image exists two times to make up a pair
        image: `/cats/image${Math.ceil(i / 2)}.jpg`,
        flipped: false,
        visible: true,
      });
    } // shuffles the cards with the Fisher-Yates algorithm
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    setCards(newCards);
  } // compares two flipped cards

  function compareCards(selectedCard) {
    const flippedCards = cards.filter((card) => card.flipped); // this happens when one card is flipped
    if (flippedCards.length < 2) {
      if (soundOn) {
        playClickSound();
      }
      selectedCard.flipped = true;
      setCards([...cards]);
    } // this happens when a second card is flipped
    if (flippedCards.length === 1 && flippedCards[0].id != selectedCard.id) {
      // this happens if the two cards match
      if (flippedCards[0].image === selectedCard.image) {
        setTimeout(() => {
          if (soundOn) {
            playSuccessSound();
          }
          setPairs(pairs + 1);
          setMoves(moves + 1);
          selectedCard.visible = false;
          flippedCards[0].visible = false;
          flippedCards[0].flipped = false;
          selectedCard.flipped = false;
          setCards([...cards]);
        }, 300);
      } // this happens if the two cards don't match
      else {
        if (soundOn) {
          playClickSound();
        }
        setTimeout(() => {
          setMoves(moves + 1);
          flippedCards[0].flipped = false;
          selectedCard.flipped = false;
          setCards([...cards]);
        }, 1000);
      }
    }
  } // checks whether any visible cards are left and triggers the win alert if there aren't

  useEffect(() => {
    const visibleCards = cards.filter((card) => card.visible === true);
    if (cards.length != 0 && visibleCards.length === 0) {
      setTimeout(() => {
        setGameStatus("winAlert");
        if (soundOn) {
          playFanfareSound();
        }
      }, 300);
    }
  }, [cards, setGameStatus, soundOn, playFanfareSound]); // starts a new game with the specified number of cards

  function startGame(numberOfCards) {
    if (soundOn) {
      playClickSound();
    }
    setGameStatus("activeGame");
    shuffleCards(numberOfCards);
  } // restarts the game in the event of a win, a timeout or manual closure

  function restartGame(win) {
    if (soundOn) {
      playClickSound();
    }
    setGameStatus("chooseLevel");
    cards.forEach((card) => (card.visible = true));
    setCards([...cards]);
    setPairs(0);
    setModalOpen(false);
    setTimer(0);
    setMoves(0);
  } // opens and closes the modal for manual closure

  function toggleModal() {
    if (soundOn) {
      playClickSound();
    }
    setModalOpen(!modalOpen);
  } // sets up a timer that increments every second while the game is running

  useEffect(() => {
    let interval;
    if (gameStatus === "activeGame") {
      interval = setInterval(() => {
        // if the timer runs for 1 hour the game will be stopped automatically
        if (timer >= 3599) {
          clearInterval(interval);
          setGameStatus("timeOut");
        } else {
          setTimer((prevTimer) => prevTimer + 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameStatus, timer, setGameStatus, setTimer]); // formats the time to enhance user readability

  const formattedTime = `${Math.floor(timer / 60)}:${(timer % 60)
    .toString()
    .padStart(2, "0")}`; // switches sound effects on and off

  function toggleSound() {
    if (!soundOn) {
      playClickSound();
    }
    setSoundOn(!soundOn);
  } // defines the size of each memory card depending on the number of cards

  return (
    <main>
      {/* modal for manual closure */}
      {modalOpen === true ? (
        <Modal toggleModal={toggleModal} restartGame={restartGame} />
      ) : null}
      {/* displays a screen where the user can choose a level */}
      {gameStatus === "chooseLevel" ? (
        <ChooseLevel startGame={startGame} />
      ) : /* displays the active game */
      gameStatus === "activeGame" ? (
        <ActiveGame
          toggleSound={toggleSound}
          toggleModal={toggleModal}
          compareCards={compareCards}
          cards={cards}
          formattedTime={formattedTime}
          moves={moves}
          pairs={pairs}
          soundOn={soundOn}
        />
      ) : /* displays user stat, animation and restart button when user wins the game */
      gameStatus === "winAlert" ? (
        <WinAlert
          formattedTime={formattedTime}
          moves={moves}
          restartGame={restartGame}
        />
      ) : (
        /* displays error message and restart button if the time for a game expires */
        <TimeOut restartGame={restartGame} />
      )}
    </main>
  );
}
