import { Christmas2023 } from "../data/GameBank";

interface AnswerBlockProps {
  title: string;
}

const AnswerBlock: React.FC<AnswerBlockProps> = ({ title }) => {
  return (
    <div className="answer-block" style={{backgroundColor: Christmas2023.difficulties[title]}}>
        <h3>{title}</h3>
        <p>{Christmas2023.categories.find((category) => category.title == title)?.words.join(', ')}</p>
    </div>
  )
}

export default AnswerBlock;