import { useState } from "react";

function RPS() {
  const options = ["Kő", "Papír", "Olló"];
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  const play = (choice) => {
    const randomIndex = Math.floor(Math.random() * 3);
    const compChoice = options[randomIndex];
    setUserChoice(choice);
    setComputerChoice(compChoice);

    if (choice === compChoice) {
      setResult("Döntetlen");
    } else if (
      (choice === "Kő" && compChoice === "Olló") ||
      (choice === "Papír" && compChoice === "Kő") ||
      (choice === "Olló" && compChoice === "Papír")
    ) {
      setResult("Nyertél! 🎉");
    } else {
      setResult("Vesztettél! 😢");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Kő - Papír - Olló</h2>
      <div style={{ margin: "20px" }}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => play(option)}
            style={{ margin: "0 10px", padding: "10px 20px" }}
          >
            {option}
          </button>
        ))}
      </div>
      {userChoice && (
        <>
          <p><strong>Te választottad:</strong> {userChoice}</p>
          <p><strong>Gép választása:</strong> {computerChoice}</p>
          <p><strong>Eredmény:</strong> {result}</p>
        </>
      )}
    </div>
  );
}

export default RPS;

  