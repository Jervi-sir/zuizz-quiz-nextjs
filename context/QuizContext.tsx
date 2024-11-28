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
  isQuizCompleted: boolean;
  currentTopic: string | null;
  isCorrect: boolean | null;
  score: number;
  fetchQuestions: (topicId: string) => Promise<void>;
  resetCurrentTopicTitle: () => void;
  selectAnswer: (answer: any) => void; // Generic type to handle different types of answers
  submitAnswer: () => void;
  goToNextQuestion: () => void;

}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]); // Scoped per question
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const resetCurrentTopicTitle = () => {
    setCurrentTopic(null);
  }
  // Utility to initialize `selectedAnswers` per question
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
          return []; // Default empty answer array
      }
    });

  const fetchQuestions = async (topicId: string) => {
    const response = await fetch(`/api/topics/${topicId}/questions`);
    const data = await response.json();
    setCurrentTopic(data.topic.name);
    setQuestions(data.questions);
    setSelectedAnswers(initializeAnswers(data));
  };

  const selectAnswer = (answer: any) => {
    if (isAnswered) return;

    const currentQuestion = questions[currentQuestionIndex];
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      switch (currentQuestion.type) {
        case 'recap_exercise':
          updated[currentQuestionIndex] = {
            ...updated[currentQuestionIndex],
            [answer.text]: answer.category,
          };
          break;
        case 'choose_multiple':
          updated[currentQuestionIndex] = updated[currentQuestionIndex]?.includes(answer)
            ? updated[currentQuestionIndex].filter((i: number) => i !== answer) // Deselect
            : [...(updated[currentQuestionIndex] || []), answer]; // Select
          break;
        case 'choose_correct':
          updated[currentQuestionIndex] = [answer];
          break;
        case 'fill_gap':
          updated[currentQuestionIndex] = {
            ...(updated[currentQuestionIndex] || {}),
            [answer.gapIndex]: answer.answer,
          };
          break;
        case 'correct_incorrect':
          updated[currentQuestionIndex] = {
            ...(updated[currentQuestionIndex] || {}),
            [answer.incorrectIndex]: answer.correction,
          };
          break;
        case 'order_answers':
          updated[currentQuestionIndex] = answer;
          break;
        default:
          break;
      }
      return updated;
    });
  };

  const arraysAreEqual = (arr1: number[], arr2: number[]) => {
    if (arr1.length !== arr2.length) return false;
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();
    return sorted1.every((value, index) => value === sorted2[index]);
  };

  const submitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswers = selectedAnswers[currentQuestionIndex];
    let correct = false;

    switch (currentQuestion.type) {
      case 'recap_exercise':
        correct = currentQuestion.criteria?.every(
          (criterion) => currentAnswers[criterion.text] === criterion.category
        ) ?? false;
        break;
      case 'choose_correct':
        correct = currentAnswers[0] === currentQuestion.correctAnswer;
        break;
      case 'choose_multiple':
        correct = arraysAreEqual(currentAnswers || [], currentQuestion.correctAnswers || []);
        break;
      case 'fill_gap':
        correct = currentQuestion.gaps?.every(
          (gap, index) => currentAnswers[index] === gap.correctAnswer
        ) ?? false;
        break;
      case 'correct_incorrect':
        correct = currentQuestion.corrections?.every(
          (correction, index) => currentAnswers[index] === correction
        ) ?? false;
        break;
      case 'order_answers':
        correct = JSON.stringify(currentAnswers) === JSON.stringify(currentQuestion.correctOrder);
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

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsAnswered(false);
      setIsCorrect(null);
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        selectedAnswers: selectedAnswers[currentQuestionIndex] || [],
        isAnswered,
        isCorrect,
        score,
        fetchQuestions,
        selectAnswer,
        submitAnswer,
        goToNextQuestion,
        isQuizCompleted,
        currentTopic,
        resetCurrentTopicTitle
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
