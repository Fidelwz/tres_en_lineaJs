/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import './App.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
function App () {
  const initializeStateFromStorage = (key, defaultValue) => {
    const valueFromStorage = window.localStorage.getItem(key)
    return valueFromStorage ? JSON.parse(valueFromStorage) : defaultValue
  }

  const saveToStorage = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  const [board, setBoard] = useState(() =>
    initializeStateFromStorage('board', Array(9).fill(null))
  )
  const [turn, setTurn] = useState(() =>
    initializeStateFromStorage('turn', TURNS.X)
  )
  const [winner, setWinner] = useState(null) // null es que no hay ganador , false es que hay un empate

  const updateBoard = (index) => {
    // if the square is already in use
    if (board[index] || winner) return
    // update board with the new data
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // update turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // save the game
    saveToStorage('board', newBoard)
    saveToStorage('turn', newTurn)

    // check if there is a winner
    const neWinner = checkWinnerFrom(newBoard)
    if (neWinner) {
      confetti()
      setWinner(neWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }
  const clearBoard = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
  return (
    <main className="board">
      <h1>Tres en linea</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal clearBoard={clearBoard} winner={winner} />
      <button onClick={clearBoard}>Reniciar</button>
    </main>
  )
}

export default App
