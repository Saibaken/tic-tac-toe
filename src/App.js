import "./index.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const fieldRef = useRef();
  const [winner, setWinner] = useState(null);
  const [player, setPlayer] = useState("❌");
  const [field, setField] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const switchPlayer = () => {
    setPlayer(player === "❌" ? "⭕" : "❌");
  };

  const makeTurn = (e) => {
    setField((prev) => {
      const newField = [...prev];
      newField[e.target.id] = player;
      return newField;
    });
    switchPlayer();
    e.target.disabled = true;
  };

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      // Horizontal check   012, 345, 678
      if (
        field[i * 3] === field[i * 3 + 1] &&
        field[i * 3 + 1] === field[i * 3 + 2] &&
        field[i * 3] !== ""
      ) {
        if (winner === null) setWinner(field[i * 3]);
      }
      // Vertical check     036, 147, 258
      if (
        field[i] === field[i + 3] &&
        field[i + 3] === field[i + 6] &&
        field[i] !== ""
      ) {
        if (winner === null) setWinner(field[i]);
      }
    }
    // Diagonal check       048, 246
    if (
      (field[0] === field[4] && field[4] === field[8] && field[0] !== "") ||
      (field[2] === field[4] && field[4] === field[6] && field[2] !== "")
    ) {
      if (winner === null) setWinner(field[4]);
    }
  }, [field, winner]);

  useEffect(() => {
    if (winner === null && !field.includes("")) {
      alert("Draw");
    }
    if (winner !== null ) {
      fieldRef.current.childNodes.forEach((item) => {
        item.firstChild.disabled = true;
      })
      alert(winner + " won!");
    }
  }, [field, winner]);

  const reset = () => {
    setField(["", "", "", "", "", "", "", "", ""]);
    fieldRef.current.childNodes.forEach((item) => {
      item.firstChild.disabled = false;
    });
    setWinner(null);
    setPlayer("❌");
  };

  return (
    <div>
      <h1 className="headline">Tic Tac Toe</h1>
      <div className="field" ref={fieldRef}>
        {field.map((item, index) => (
          <span key={index} className="tile-span">
            <button
              className="game-tile"
              key={index}
              id={index}
              onClick={(e) => makeTurn(e)}
            >
              {item}
            </button>
            {index % 3 === 2 ? <br></br> : <></>}
          </span>
        ))}
      </div>
      <button className="reset-button" onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
