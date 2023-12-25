import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Christmas2023, ConnectionsGame } from './data/GameBank'
import WordBlock from './components/WordBlock'

const randomizeWords = (game: ConnectionsGame) => {
  let words: string[] = []
  for (let i = 0; i < game.categories.length; i++) {
    words = [...words, ...game.categories[i].words];
  }

  const randomized = words.sort(() => Math.random() - 0.5)

  const result = []
  const chunkSize = 4
  for (let i = 0; i < randomized.length; i += chunkSize) {
    result.push(randomized.slice(i, i + chunkSize))
  }

  return result
}



function App() {
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([])
  const [unanswered, setUnanswered] = useState(randomizeWords(Christmas2023))
  const [selected, setSelected] = useState(new Set())
  const [mistakesRemaining, setMistakesRemaining] = useState(4)

  //make sure message disappers
  const [message, setMessage] = useState<string>()

  const checkAnswer = () => {
    if (selected.size < 4) {
      setMessage("You must select 4 words.")
      return
    }

    const categories = Christmas2023.categories

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i]
      console.log(`checking ${category.title}`)
      let correctCount = 0
      
      const correct = category.words.every((word) => {
        console.log(`checking ${word}`)
        if (selected.has(word)) {
          correctCount++
        }
        console.log(`correctCount: ${correctCount}`)
        console.log(`selected.has(${word}): ${selected.has(word)}`)
        return selected.has(word)
      })

      console.log(`correct: ${correct}`)

      if (correct) {
        setCorrectAnswers([...correctAnswers, category.title])
        return
      } else if (correctCount == 3) {
        setMessage("You're one away!")
        return
      }
    }
    setMistakesRemaining((mistakesRemaining) => mistakesRemaining - 1)
    console.log('checkAnswer done')
  }

  const handleSelect = (word: string ) => {
    console.log(`handleSelect being called with: ${word}`)
    if (selected.has(word)) {
      selected.delete(word)
      setSelected(new Set(selected))
    } else if (selected.size < 4) {
      setSelected(new Set(selected.add(word)))
    }
  }

  console.log(mistakesRemaining)

  return (
    <div className="column center">
      <div>
        {unanswered.map((row) => (
          <div className="row">
            {row.map(
              (word) => (
                <WordBlock key={word} word={word} selected={selected.has(word)} handleSelect={handleSelect}/>
              )
            )}
          </div>
        ))}
      </div>
      <div className="row">
        <button onClick={() => {}}>Hint</button>
        <button onClick={() => {}}>Deselect All</button>
        <button onClick={checkAnswer}>Submit</button>
      </div>
    </div>
  )
}

export default App;
