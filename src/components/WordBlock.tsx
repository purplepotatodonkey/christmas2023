interface WordBlockProps {
  word: string;
  selected: boolean;
  handleSelect: (word: string) => void;
}

const WordBlock: React.FC<WordBlockProps> = ({ word, selected, handleSelect }) => {
  return (
    <div className={selected ? 'selected-word-block' : 'unselected-word-block'} onClick={() => handleSelect(word)}>
      <p>{word}</p>
    </div>
  )
}

export default WordBlock;