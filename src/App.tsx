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
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [unanswered, setUnanswered] = useState(randomizeWords(Christmas2023))
  const [selected, setSelected] = useState(new Set())
  const [mistakes, setMistakes] = useState(0)

  const checkAnswer = () => {
    const words = Array.from(selected)

    if (words.length !== 4) {
      return "You must select 4 words."
    }

    const category = Christmas2023.categories.find((category) => category.words.includes(words.get))
    if (!category) {
      return
    }

    const correct = category.words.every((word) => words.includes(word))
    if (correct) {
      setCorrectAnswers([...correctAnswers, category])
      setUnanswered(unanswered.filter((row) => !row.some((word) => category.words.includes(word))))
    } else {
      setMistakes(mistakes + 1)
    }
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

  return (
    <div className="column">
      <div className="grid">
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
      <div className="row center">
        <button onClick={() => {}}>Hint</button>
        <button onClick={() => {}}>Deselect All</button>
        <button onClick={() => {}}>Submit</button>
      </div>
    </div>
  )
}

export default App;
