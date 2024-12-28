import { useState } from "react"
import { languages } from "./language"
import {words} from "./wordsList"
import clsx from "clsx";
import ReactConfetti from "react-confetti";

export default function App() {
  const listOfWords = words

  const randomWord = listOfWords[Math.floor(Math.random() * 30)]

  const [currentWord, setCurrentWord] = useState(randomWord)
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongGuessedCounter,setWrongGuessedCounter] = useState(0)

  const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

  const letterElements = currentWord.split("")

  const isGameWon = letterElements.every((letter) => guessedLetters.includes(letter))

  console.log(currentWord);

  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => {
      if (prevLetters.includes(letter)) {
        return prevLetters
      } else {
        return [...prevLetters, letter]
      }
    })

    if (!currentWord.includes(letter) && !guessedLetters.includes(letter)) {
      setWrongGuessedCounter(wrongGuessedCounter + 1)
    }
  }

  function newGame() {
    setGuessedLetters([])
    const randomWord = listOfWords[Math.floor(Math.random() * 20)]
    setCurrentWord(randomWord)
    setWrongGuessedCounter(0)
  }

  return(
    <main>
      <header>
        <h3>Assembly Endgame</h3>
        <p>Guess the woed in under 8 attempts to keep the programming word safe from Assembly</p>
      </header>
      {isGameWon ?
        <section className="game-status">
          <h3>You Win!</h3>
          <p>well done!🎉</p>
        </section>
      : wrongGuessedCounter >= 8 && !isGameWon ?
      <section className="game-over">
        <h3>You Lost HAHAHAHA!</h3>
        <p>Try again!💀</p>
      </section>
      : ""}

      <div className="languages-container">
        {languages.map((language,index) => {
          return <div className={`language ${index <= wrongGuessedCounter-1 ? "lost" : ""}`} key={language.name} style={{color: language.color, backgroundColor: language.backgroundColor}}><p>{language.name}</p></div>
          })}
      </div>
      
      <div className="word">
        {letterElements.map((letter,index) => {
          const isGuessedWordIncludesLetterElement = guessedLetters.includes(letter)
          const gameAlreadyLost = wrongGuessedCounter >= 8 && !isGameWon
          
          console.log(!isGuessedWordIncludesLetterElement || gameAlreadyLost);

          return <div className={"letter-element"} key={index}><h2 hidden={isGuessedWordIncludesLetterElement ? false : gameAlreadyLost ? false : true} className={(!isGuessedWordIncludesLetterElement && gameAlreadyLost) ? 'red-word' : ""}>{letter.toUpperCase()}</h2></div>
            }
          )}
      </div>

      <div className="alphabet-container">
        {alphabet.map((alp, index) => {
          const isGuessed = guessedLetters.includes(alp)
          const isCorrect = isGuessed && currentWord.includes(alp)
          const isWrong = isGuessed && !currentWord.includes(alp)
          
          const className = clsx({
            correct: isCorrect,
            wrong: isWrong
          })

          const gameAlreadyLost = wrongGuessedCounter >= 8 && !isGameWon
          return <button disabled={gameAlreadyLost || isGameWon} onClick={() => addGuessedLetter(alp)} key={index} className={"alphabet "+className}>{alp.toUpperCase()}</button>
          })}
      </div>
      <button onClick={newGame} className="new-game">New Game</button>
      {isGameWon && <ReactConfetti/>}
    </main>
  )
}
