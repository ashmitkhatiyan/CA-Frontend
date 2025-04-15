export interface Question {
  id: number;
  sentence: string;
  blanks: Blank[];
  options: string[];
  correctAnswers: string[];
}

export interface Blank {
  id: number;
  position: number;
  selectedWord?: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  questions: Question[];
  score: number;
  timeRemaining: number;
  isQuizComplete: boolean;
  answers: {
    [key: number]: {
      selectedWords: string[];
      isCorrect: boolean;
    };
  };
} 