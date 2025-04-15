import { useEffect } from 'react';
import { QuizState } from '../types';
import { Timer, QuestionDisplay, OptionsDisplay, NextButton } from './index';

interface QuizProps {
  quizState: QuizState;
  setQuizState: React.Dispatch<React.SetStateAction<QuizState>>;
}

export default function Quiz({ quizState, setQuizState }: QuizProps) {
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setQuizState(prev => {
        if (prev.timeRemaining <= 1) {
          clearInterval(timer);
          return handleNextQuestion(prev);
        }
        return {
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.currentQuestionIndex]);

  const handleWordSelect = (word: string, blankId: number) => {
    setQuizState(prev => {
      const updatedQuestions = [...prev.questions];
      const currentQuestion = { ...updatedQuestions[prev.currentQuestionIndex] };
      const blank = currentQuestion.blanks.find(b => b.id === blankId);
      
      if (blank) {
        // Check if the word is already selected in another blank
        const isWordAlreadySelected = currentQuestion.blanks.some(
          b => b.id !== blankId && b.selectedWord === word
        );
        
        if (!isWordAlreadySelected) {
          blank.selectedWord = word;
        }
      }

      updatedQuestions[prev.currentQuestionIndex] = currentQuestion;
      return {
        ...prev,
        questions: updatedQuestions
      };
    });
  };

  const handleWordDeselect = (blankId: number) => {
    setQuizState(prev => {
      const updatedQuestions = [...prev.questions];
      const currentQuestion = { ...updatedQuestions[prev.currentQuestionIndex] };
      const blank = currentQuestion.blanks.find(b => b.id === blankId);
      
      if (blank) {
        blank.selectedWord = undefined;
      }

      updatedQuestions[prev.currentQuestionIndex] = currentQuestion;
      return {
        ...prev,
        questions: updatedQuestions
      };
    });
  };

  const handleNextQuestion = (prevState: QuizState) => {
    const currentQuestion = prevState.questions[prevState.currentQuestionIndex];
    const selectedWords = currentQuestion.blanks
      .map(blank => blank.selectedWord)
      .filter(Boolean) as string[];

    const isCorrect = selectedWords.every((word, index) => 
      word === currentQuestion.correctAnswers[index]
    );

    const newScore = isCorrect ? prevState.score + 1 : prevState.score;

    const isLastQuestion = prevState.currentQuestionIndex === prevState.questions.length - 1;

    return {
      ...prevState,
      currentQuestionIndex: isLastQuestion ? prevState.currentQuestionIndex : prevState.currentQuestionIndex + 1,
      timeRemaining: 30,
      score: newScore,
      isQuizComplete: isLastQuestion,
      answers: {
        ...prevState.answers,
        [prevState.currentQuestionIndex]: {
          selectedWords,
          isCorrect
        }
      }
    };
  };

  const handleNext = () => {
    setQuizState(handleNextQuestion);
  };

  const isAllBlanksFilled = currentQuestion.blanks.every(blank => blank.selectedWord);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}
        </h2>
        <Timer timeRemaining={quizState.timeRemaining} />
      </div>

      <QuestionDisplay
        question={currentQuestion}
        onWordDeselect={handleWordDeselect}
      />

      <OptionsDisplay
        options={currentQuestion.options}
        selectedWords={currentQuestion.blanks.map(b => b.selectedWord)}
        onWordSelect={handleWordSelect}
      />

      <NextButton
        isEnabled={isAllBlanksFilled}
        onClick={handleNext}
      />
    </div>
  );
} 