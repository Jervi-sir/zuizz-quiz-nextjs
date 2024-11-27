'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  type: string; // 'choose_correct' | 'choose_multiple' | 'fill_gap' | 'correct_incorrect'
  options?: string[];
  correctAnswer?: number;
  correctAnswers?: number[];
  gaps?: Array<{ text: string; correctAnswer: string }>;
  incorrectOptions?: string[]; // For correct_incorrect type
  corrections?: string[]; // Expected corrections
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

  const selectAnswer = (indexOrAnswer: number | { incorrectIndex: number; correction: string }) => {
    if (isAnswered) return;
  
    const currentQuestion = questions[currentQuestionIndex];
  
    if (currentQuestion.type === 'choose_multiple') {
      setSelectedAnswers((prev) =>
        typeof indexOrAnswer === 'number' && prev.includes(indexOrAnswer)
          ? prev.filter((i) => i !== indexOrAnswer)
          : [...prev, indexOrAnswer as number]
      );
    } else if (currentQuestion.type === 'choose_correct') {
      setSelectedAnswers([indexOrAnswer as number]);
    } else if (currentQuestion.type === 'fill_gap') {
      if (typeof indexOrAnswer === 'object') {
        setSelectedAnswers((prev) => {
          const updated = [...prev];
          updated[indexOrAnswer.gapIndex] = indexOrAnswer.answer;
          return updated;
        });
      }
    } else if (currentQuestion.type === 'correct_incorrect') {
      if (typeof indexOrAnswer === 'object') {
        setSelectedAnswers((prev) => {
          const updated: any = [...prev];
          updated[indexOrAnswer.incorrectIndex] = indexOrAnswer.correction;
          return updated;
        });
      }
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
    } else if (currentQuestion.type === 'fill_gap') {
      correct = currentQuestion.gaps!.every(
        (gap, index) => selectedAnswers[index] === gap.correctAnswer
      );
    } else if (currentQuestion.type === 'correct_incorrect') {
      correct = currentQuestion.corrections!.every(
        (correction, index) => selectedAnswers[index] === correction
      );
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
