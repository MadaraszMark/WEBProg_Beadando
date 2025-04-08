function Menu({ onSelect }) {
    return (
      <nav style={{ textAlign: "center", margin: "20px" }}>
        <button onClick={() => onSelect("calc")} style={{ marginRight: "10px" }}>Számológép</button>
        <button onClick={() => onSelect("rps")}>Kő-Papír-Olló</button>
      </nav>
    );
  }
  
  export default Menu;
  