import { useState } from 'react'
import './App.css'
import { Christmas2023, ConnectionsGame } from './data/GameBank'
import WordBlock from './components/WordBlock'
import AnswerBlock from './components/AnswerBlock'

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

  const getNewUnanswered = () => {
    const flattenedArray = unanswered.flat()
    const flatResult = flattenedArray.filter((word) => !selected.has(word))
    const groupSize = 4;
    let result = [];
    for (let i = 0; i < flatResult.length; i += groupSize) {
        result.push(flatResult.slice(i, i + groupSize));
    }
    setUnanswered(result)
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

  const renderMistakes = () => {
    let dots = [];
    for (let i = 0; i < mistakesRemaining; i++) {
        dots.push(<div key={i} className="dot"></div>);
    }
    return dots;
  };

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
      
      let correct = true

      for (let i = 0; i < category.words.length; i++) {
        const word = category.words[i]
        if (selected.has(word)) {
          correctCount++
        } else {
          correct = false
        }
      }

      console.log(`correct: ${correct}`)

      if (correct) {
        setCorrectAnswers([...correctAnswers, category.title])
        getNewUnanswered()
        setSelected(new Set())
        setMessage("Correct!")
        return
      } else if (correctCount == 3) {
        setMessage("You're one away!")
        setMistakesRemaining((mistakesRemaining) => mistakesRemaining - 1)
        return
      }
    }
    setMistakesRemaining((mistakesRemaining) => mistakesRemaining - 1)
    console.log('checkAnswer done')
  }

  const getHint = () => {
    const categories = Christmas2023.categories
    let maxCategory = Christmas2023.categories[0].title
    let maxCount = 0

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i]
      let correctCount = 0

      for (let i = 0; i < category.words.length; i++) {
        const word = category.words[i]
        if (selected.has(word)) {
          correctCount++
        }
      }

      if (correctCount > maxCount) {
        maxCount = correctCount
        maxCategory = category.title
      }
    }

    setMessage(Christmas2023.hints[maxCategory])
  }

  return (
    <div className="column center">
      <h1>Merry Christmas to my love!</h1>
      <div>
        {correctAnswers.map((answer) => (
          <AnswerBlock key={answer} title={answer}/>
        ))}
      </div>
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
      <p>{message}</p>
      <div className="row center">
        <p>Mistakes remaining:</p>
        {renderMistakes()}
      </div>
      <div className="row">
        <button onClick={getHint}>Hint</button>
        <button onClick={() => {}}>Deselect All</button>
        <button onClick={checkAnswer}>Submit</button>
      </div>
    </div>
  )
}

export default App;
