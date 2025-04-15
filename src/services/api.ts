import { Question } from '../types';

const mockQuestions: Question[] = [
  {
    id: 1,
    sentence: "The ___ is a ___ animal that lives in the ___.",
    blanks: [
      { id: 1, position: 4 },
      { id: 2, position: 8 },
      { id: 3, position: 15 }
    ],
    options: ["lion", "wild", "forest", "elephant"],
    correctAnswers: ["lion", "wild", "forest"]
  },
  {
    id: 2,
    sentence: "JavaScript is a ___ programming language used for ___ development.",
    blanks: [
      { id: 1, position: 4 },
      { id: 2, position: 8 }
    ],
    options: ["popular", "web", "difficult", "old"],
    correctAnswers: ["popular", "web"]
  },
  {
    id: 3,
    sentence: "The ___ of the ___ is to ___ the code.",
    blanks: [
      { id: 1, position: 4 },
      { id: 2, position: 8 },
      { id: 3, position: 12 }
    ],
    options: ["purpose", "function", "execute", "compile"],
    correctAnswers: ["purpose", "function", "execute"]
  }
];

export const fetchQuestions = async (): Promise<Question[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockQuestions;
}; 