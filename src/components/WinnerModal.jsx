import { Square } from "./Square";
export function WinnerModal({clearBoard, winner}) {
  if (winner === null) return null;
  const textgame = winner === false ? "Empate" : "mi nigga u won"
  return (
    <section className="winner">
      <div className="text">
        <h2>{textgame}</h2>
        <header className="win">{winner && <Square>{winner}</Square>}</header>
        <footer>
          <button onClick={clearBoard}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>  
  );
}
