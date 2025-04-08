import { useState } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Calculator from "./components/Calculator";
import RPS from "./components/RPS";

function App() {
  const [view, setView] = useState("calc");

  return (
    <div>
      <Header />
      <Menu onSelect={setView} />
      {view === "calc" ? <Calculator /> : <RPS />}
    </div>
  );
}
export default App;