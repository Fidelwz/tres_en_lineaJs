/* eslint-disable react/prop-types */
const TURNS = {
  X: "x",
  O: "o",
};
const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]

]
import "./App.css";
import { useState } from "react";
import confetti from "canvas-confetti";
const Square = ({ isSelected, updateBoard, index,children }) => {

  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null) //null es que no hay ganador , false es que hay un empate
 const checkWinner = (boardToCheck) =>{
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
        ){
          return boardToCheck[a]
         
      }
    
      }
    return null
 }
 const checkEndGame =(newBoard) =>{
  return newBoard.every((square) => square !== null)
}

  const updateBoard = (index) => {
    if(board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //revisar si hay un ganador
    const neWinner = checkWinner(newBoard)
    if(neWinner){
      confetti()
      setWinner(neWinner)
    }else if(checkEndGame(newBoard)){
        
        setWinner(false)
    }
  }
  const clearBoard = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  return (
    <main className="board">
      <h1>Tres en linea online</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {
        winner !== null && (
          <section className="winner">
            <div className="text">
          <h2>
            {
              winner === false ?
              'Empate' :
              'mi nigga u won'
            }
          </h2>
          <header className='win'>
                {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                  <button onClick={clearBoard} >Empezar de nuevo</button>
                </footer>
            </div>
          </section>
        )
      }
    </main>
  );
}

export default App
