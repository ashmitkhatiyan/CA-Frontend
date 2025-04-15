import { Question } from '../types';

interface QuestionDisplayProps {
  question: Question;
  onWordDeselect: (blankId: number) => void;
}

export default function QuestionDisplay({ question, onWordDeselect }: QuestionDisplayProps) {
  const parts = question.sentence.split('___');
  const blanks = question.blanks.sort((a, b) => a.position - b.position);

  return (
    <div className="mb-8">
      <div className="text-lg text-gray-700 mb-4">
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && (
              <span
                className="inline-block min-w-[100px] h-8 mx-1 px-2 py-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                onClick={() => onWordDeselect(blanks[index].id)}
              >
                {blanks[index].selectedWord || '___'}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
} 