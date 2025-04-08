import { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleEqual = () => {
    try {
      const result = eval(input);
      setInput(result.toString());
    } catch {
      setInput("Hiba");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <input
        type="text"
        value={input}
        readOnly
        style={{ width: "100%", padding: "10px", fontSize: "20px", marginBottom: "10px" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        {["7", "8", "9", "/",
          "4", "5", "6", "*",
          "1", "2", "3", "-",
          "0", ".", "=", "+"].map((btn, index) => (
          <button
            key={index}
            onClick={() => btn === "=" ? handleEqual() : handleClick(btn)}
            style={{ padding: "15px", fontSize: "18px" }}
          >
            {btn}
          </button>
        ))}
        <button
          onClick={handleClear}
          style={{ gridColumn: "span 4", padding: "15px", fontSize: "18px", backgroundColor: "#f44", color: "#fff" }}
        >
          C
        </button>
      </div>
    </div>
  );
}

export default Calculator;
