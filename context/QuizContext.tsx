'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  type: string; // 'choose_correct' | 'choose_multiple' etc.
  options: string[];
  correctAnswer?: number;
  correctAnswers?: number[];
}

interface QuizContextType {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: number[];
  isAnswered: boolean;
  isCorrect: boolean | null;
  score: number;
  fetchQuestions: (topicId: string) => Promise<void>;
  selectAnswer: (index: number) => void;
  submitAnswer: () => void;
  goToNextQuestion: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const fetchQuestions = async (topicId: string) => {
    const response = await fetch(`/api/topics/${topicId}/questions`);
    const data = await response.json();
    setQuestions(data);
  };

  const selectAnswer = (index: number) => {
    if (isAnswered) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.type === 'choose_multiple') {
      setSelectedAnswers((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Deselect if already selected
          : [...prev, index] // Select if not already selected
      );
    } else {
      setSelectedAnswers([index]); // Only one answer for 'choose_correct' or others
    }
  };

  const submitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    let correct = false;

    if (currentQuestion.type === 'choose_correct') {
      correct = selectedAnswers[0] === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'choose_multiple') {
      correct =
        JSON.stringify([...selectedAnswers].sort()) ===
        JSON.stringify([...currentQuestion.correctAnswers!].sort());
    }

    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const goToNextQuestion = () => {
    setSelectedAnswers([]);
    setIsAnswered(false);
    setIsCorrect(null);
  
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < questions.length - 1) {
        return prevIndex + 1; // Move to the next question
      }
      return prevIndex + 1; // Increment beyond the last question to trigger the score screen
    });
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
