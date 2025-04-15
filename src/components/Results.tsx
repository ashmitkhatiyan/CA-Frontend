import { QuizState } from '../types';

interface ResultsProps {
  quizState: QuizState;
  onRestart: () => void;
}

export default function Results({ quizState, onRestart }: ResultsProps) {
  const totalQuestions = quizState.questions.length;
  const score = quizState.score;
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Quiz Results
      </h2>

      <div className="text-center mb-8">
        <div className="text-4xl font-bold mb-2 text-blue-600">
          {score}/{totalQuestions}
        </div>
        <div className="text-lg text-gray-600">
          {percentage}% Correct
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {quizState.questions.map((question, index) => {
          const answer = quizState.answers[index];
          const isCorrect = answer?.isCorrect;

          return (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                isCorrect ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="flex items-start mb-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                  isCorrect ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  <span className="text-white text-sm">
                    {isCorrect ? '✓' : '✗'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 mb-2">
                    {question.sentence.split('___').map((part, i) => (
                      <span key={i}>
                        {part}
                        {i < question.sentence.split('___').length - 1 && (
                          <span className={`font-semibold ${
                            isCorrect ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {answer?.selectedWords[i] || '___'}
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                  {!isCorrect && (
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Correct answer:</span>{' '}
                      {question.correctAnswers.map((word, i) => (
                        <span key={i} className="ml-1 text-green-600">
                          {word}
                          {i < question.correctAnswers.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onRestart}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Restart Quiz
      </button>
    </div>
  );
} 
