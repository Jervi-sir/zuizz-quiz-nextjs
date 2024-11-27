'use client';

import { useEffect } from 'react';
import { useQuiz } from '@/context/QuizContext';
import { QuestionCard } from '@/components/QuestionCard';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TopicQuestions({ params }: { params: { id: string } }) {
  const {
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
  } = useQuiz();

  useEffect(() => {
    fetchQuestions(params.id);
  }, [params.id]);

  if (questions.length === 0) {
    return <p>Loading...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Quiz Completed!</h1>
        <p className="text-lg">Your Score: {score} / {questions.length}</p>
        <Link href="/topics">
          <Button className="mt-4">Back to Topics</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <div className="p-1">
          <Card>
            <CardContent className="flex aspect-video items-center justify-center p-6">
              <span className="text-4xl font-semibold">{currentQuestion.question}</span>
            </CardContent>
          </Card>
          <div className="p-1 pt-4">
            <Progress value={(currentQuestionIndex / questions.length) * 100} />
          </div>
          <div className="pt-3 flex flex-col gap-3">
            {currentQuestion.options.map((option, index) => (
              <QuestionCard
                key={index}
                option={option}
                index={index}
                onChoose={() => selectAnswer(index)}
                isCorrect={
                  isAnswered
                    ? isCorrect
                      ? selectedAnswers.includes(index) // Show only the selected correct answer
                      : currentQuestion.type === 'choose_multiple'
                        ? currentQuestion.correctAnswers?.includes(index) // Show correct answers for multiple choice
                        : index === currentQuestion.correctAnswer // Show correct answer for single choice
                    : null
                }
                selected={selectedAnswers.includes(index)}
                disabled={isAnswered}
              />
            ))}
          </div>
          <div className="flex justify-end pt-4">
            {!isAnswered ? (
              <Button onClick={submitAnswer} disabled={selectedAnswers.length === 0}>
                Answer
              </Button>
            ) : (
              <Button onClick={goToNextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
