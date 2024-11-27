'use client';

import { useEffect } from 'react';
import { useQuiz } from '@/context/QuizContext';
import { QuestionCard } from '@/components/QuestionCard';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FeedbackDrawer } from '@/components/custom/FeedbackDrawer';
import { ChooseAnswer } from './choose-answer';
import { FillGap } from './fill-gap';
import { CorrectIncorrect } from './correct-incorrect';
import { OrderAnswers } from './order-answer';
import { ClassifyAnswers } from './classify-answers';

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
            {
              (currentQuestion.type === 'choose_multiple' || currentQuestion.type === 'choose_correct')
              &&
              <>
                <h1>
                  {currentQuestion.type === 'choose_multiple' && 'Select multiple'}
                  {currentQuestion.type === 'choose_correct' && 'Select One Answer'}
                </h1>
                <ChooseAnswer 
                  currentQuestion={currentQuestion}
                  isAnswered={isAnswered}
                  isCorrect={isCorrect}
                  onSelectAnswer={(e) => selectAnswer(e)}
                  selectedAnswers={selectedAnswers}
                />
              </>
            }
            {currentQuestion.type === 'fill_gap' && (
              <>
                <h1> Fille Gap</h1>
                <FillGap
                  currentQuestion={currentQuestion}
                  onFillGap={(e) => selectAnswer(e)}
                  selectedAnswers={selectedAnswers}
                  isAnswered={isAnswered}
                />
              </>
            )}
            {currentQuestion.type === 'correct_incorrect' && (
              <>
                <h1>Correct these wrong answers</h1>
                <CorrectIncorrect
                  currentQuestion={currentQuestion}
                  onCorrectOption={(e) => selectAnswer(e)}
                  selectedAnswers={selectedAnswers}
                  isAnswered={isAnswered}
                />
              </>
            )}
            {currentQuestion.type === 'order_answers' && (
              <>
                <h1>Order the words</h1>
                <OrderAnswers
                currentQuestion={currentQuestion}
                selectedAnswers={selectedAnswers.length ? selectedAnswers : currentQuestion.options.map((_, i) => i)}
                onReorder={(newOrder) => selectAnswer(newOrder)}
                isAnswered={isAnswered}
              />
              </>
            )}
            {currentQuestion.type === 'recap_exercise' && (
              <>
                <h1>Classify the words</h1>
                <ClassifyAnswers 
                  currentQuestion={currentQuestion} 
                  isAnswered={isAnswered} 
                />

              </>
            )}
          </div>
          {isAnswered && (
            <FeedbackDrawer
              isCorrect={isCorrect!}
              description={
                isCorrect
                  ? "Well done! You got the right answer."
                  : "Better luck next time! See the correct answer above."
              }
              score={score}
              onNext={goToNextQuestion}
            />
          )}
          {!isAnswered && (
            <div className="flex justify-end pt-4">
              <Button onClick={submitAnswer} disabled={selectedAnswers.length === 0}>
                Answer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
