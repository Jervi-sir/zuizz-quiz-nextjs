'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Question {
  id: number;
  question: string;
  type: string; // 'choose_correct' | 'choose_multiple' | 'fill_gap' | 'correct_incorrect' | 'order_answers' | 'recap_exercise'
  options?: string[];
  correctAnswer?: number;
  correctAnswers?: number[];
  gaps?: Array<{ text: string; correctAnswer: string }>;
  incorrectOptions?: string[];
  corrections?: string[];
  correctOrder?: number[];
  criteria?: Array<{ text: string; category: string }>;
}

interface QuizContextType {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: any[]; // Generic type to handle different types of answers
  isAnswered: boolean;
  isCorrect: boolean | null;
  score: number;
  fetchQuestions: (topicId: string) => Promise<void>;
  selectAnswer: (answer: any) => void; // Generic type to handle different types of answers
  submitAnswer: () => void;
  goToNextQuestion: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  // Initialize answers based on question type
  const initializeAnswers = (questions: Question[]) =>
    questions.map((question) => {
      switch (question.type) {
        case 'order_answers':
          return question.options?.map((_, i) => i) || [];
        case 'recap_exercise':
          const criteriaState: Record<string, string> = {};
          question.criteria?.forEach((criterion) => {
            criteriaState[criterion.text] = 'unclassified';
          });
          return criteriaState;
        default:
          return [];
      }
    });

  // Fetch questions and initialize state
  const fetchQuestions = async (topicId: string) => {
    const response = await fetch(`/api/topics/${topicId}/questions`);
    const data = await response.json();
    setQuestions(data);
    setSelectedAnswers(initializeAnswers(data));
  };

  // Handle selecting an answer based on question type
  const selectAnswer = (answer: any) => {
    if (isAnswered) return;

    const currentQuestion = questions[currentQuestionIndex];

    switch (currentQuestion.type) {
      case 'recap_exercise':
        setSelectedAnswers((prev: any) => ({
          ...prev,
          [answer.text]: answer.category,
        }));
        break;

      case 'choose_multiple':
        setSelectedAnswers((prev) =>
          typeof answer === 'number' && prev.includes(answer)
            ? prev.filter((i) => i !== answer)
            : [...prev, answer]
        );
        break;

      case 'choose_correct':
        setSelectedAnswers([answer]);
        break;

      case 'fill_gap':
        setSelectedAnswers((prev) => {
          const updated = [...prev];
          updated[answer.gapIndex] = answer.answer;
          return updated;
        });
        break;

      case 'correct_incorrect':
        setSelectedAnswers((prev) => {
          const updated = [...prev];
          updated[answer.incorrectIndex] = answer.correction;
          return updated;
        });
        break;

      case 'order_answers':
        setSelectedAnswers(answer);
        break;

      default:
        break;
    }
  };

  // Validate and submit the current answer
  const submitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    let correct = false;

    switch (currentQuestion.type) {
      case 'recap_exercise':
        correct = currentQuestion.criteria?.every(
          (criterion) => selectedAnswers[criterion.text] === criterion.category
        ) ?? false;
        break;

      case 'choose_correct':
        correct = selectedAnswers[0] === currentQuestion.correctAnswer;
        break;

      case 'choose_multiple':
        correct =
          JSON.stringify([...selectedAnswers].sort()) ===
          JSON.stringify([...currentQuestion.correctAnswers!].sort());
        break;

      case 'fill_gap':
        correct = currentQuestion.gaps?.every(
          (gap, index) => selectedAnswers[index] === gap.correctAnswer
        ) ?? false;
        break;

      case 'correct_incorrect':
        correct = currentQuestion.corrections?.every(
          (correction, index) => selectedAnswers[index] === correction
        ) ?? false;
        break;

      case 'order_answers':
        correct =
          JSON.stringify(selectedAnswers) === JSON.stringify(currentQuestion.correctOrder);
        break;

      default:
        break;
    }

    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  // Move to the next question
  const goToNextQuestion = () => {
    setSelectedAnswers([]);
    setIsAnswered(false);
    setIsCorrect(null);

    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        selectedAnswers,
        isAnswered,
        isCorrect,
        score,
        fetchQuestions,
        selectAnswer,
        submitAnswer,
        goToNextQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
