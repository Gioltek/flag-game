import React, { useState, useEffect, ChangeEvent } from "react";
import fetchNations from "./fetchNations";
import { Nations } from "./types";

function App() {
  const [nations, setNations] = useState<Nations>({});
  const [nationNames, setNationNames] = useState<string[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<Boolean>(false);
  const [areNationsShown, setAreNationsShown] = useState<Boolean>(false);
  const [difficulty, setDifficulty] = useState<number>(0);
  const [playerOneScore, setPlayerOneScore] = useState<number>(0);
  const [playerTwoScore, setPlayerTwoScore] = useState<number>(0);

  const getRandomNation = (): string => {
    let randomIndex = Math.floor(Math.random() * Object.keys(nations).length);
    let randomNation = Object.keys(nations)[randomIndex];
    return randomNation;
  };

  const gameStart = () => {
    setIsGameStarted(true);
    setNationNames([]);
    let nationsArray: string[] = [];
    for (let i = 0; i < (difficulty ? difficulty : 3); i++) {
      nationsArray.push(getRandomNation());
    }
    setNationNames(nationsArray);
  };

  const showNations = () => {
    setAreNationsShown(!areNationsShown);
  };

  const handleMode = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.textContent === "Modalità semplice") {
      e.currentTarget.innerText = "Modalità difficile";
      setDifficulty(2);
      console.log(difficulty);
      return;
    }
    if (e.currentTarget.textContent === "Modalità difficile") {
      e.currentTarget.textContent = "Modalità semplice";
      setDifficulty(3);
      console.log(difficulty);
      return;
    }
  };

  useEffect(() => {
    fetchNations().then((newNations) => setNations(newNations));
  }, []);

  return (
    <div className="container">
      <div className="game-btns">
        <button onClick={handleMode}>Modalità semplice</button>
        <button onClick={showNations}>Mostra nazioni</button>
      </div>
      <button className="accent" onClick={gameStart}>
        Gioca
      </button>
      <div className="game-container">
        {isGameStarted &&
          nationNames.map((nationName, i) => (
            <div className="flag-container" key={i}>
              <img
                src={`https://flagcdn.com/${nationName}.svg`}
                alt="nation flag"
              />
              {areNationsShown && <p>{nations[nationName]}</p>}
            </div>
          ))}
      </div>
      {isGameStarted && (
        <footer>
          <div>
            <p>
              Giocatore 1: <span>{playerOneScore}</span> punti
            </p>
            <button onClick={() => setPlayerOneScore(playerOneScore + 1)}>
              +1
            </button>
          </div>

          <div>
            <p>
              Giocatore 2: <span>{playerTwoScore}</span> punti
            </p>
            <button onClick={() => setPlayerTwoScore(playerTwoScore + 1)}>
              +1
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
