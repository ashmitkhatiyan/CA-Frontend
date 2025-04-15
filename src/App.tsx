import { useState, useEffect } from 'react';
import { fetchQuestions } from './services/api';
import { QuizState } from './types';
import { Quiz, Results, Loading } from './components';

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    questions: [],
    score: 0,
    timeRemaining: 30,
    isQuizComplete: false,
    answers: {}
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadQuestions = async () => {
    try {
      const questions = await fetchQuestions();
      setQuizState(prev => ({
        ...prev,
        questions,
        currentQuestionIndex: 0,
        score: 0,
        timeRemaining: 30,
        isQuizComplete: false,
        answers: {}
      }));
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleRestart = () => {
    setIsLoading(true);
    loadQuestions();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Fill in the Blanks Quiz
        </h1>
        {!quizState.isQuizComplete ? (
          <Quiz quizState={quizState} setQuizState={setQuizState} />
        ) : (
          <Results quizState={quizState} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}

export default App;
