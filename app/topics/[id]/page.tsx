'use client';

import { useEffect } from 'react';
import { useQuiz } from '@/context/QuizContext';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FeedbackDrawer } from '@/components/custom/FeedbackDrawer';
import { ChooseAnswer } from './choose-answer';
import { FillGapSwappable } from './fill-gap';
import { CorrectIncorrect } from './correct-incorrect';
import { OrderAnswers } from './order-answer';
import { ClassifyAnswers } from './classify-answers';
import { Skeleton } from '@/components/ui/skeleton';

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
    isQuizCompleted,
    resetCurrentTopicTitle
  } = useQuiz();

  useEffect(() => {
    fetchQuestions(params.id);
  }, [params.id]);

  if (questions.length === 0) {
    return (
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min md:w-[500px] p-1 space-y-3">
        <Skeleton className='aspect-video' />
        <p className='text-center'>تحميل...</p>
        <Skeleton className='h-[60px]' />
        <Skeleton className='h-[60px]' />
        <Skeleton className='h-[60px]' />
      </div>

    );
  }


  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex >= questions.length || isQuizCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">تم الانتهاء من الاختبار!</h1>
        <p className="text-lg">
          نقاطك: <span>{score} / {questions.length}</span>
        </p>
        <Link href="/topics">
          <Button className="mt-4" onClick={resetCurrentTopicTitle}>العودة إلى المواضيع</Button>
        </Link>
      </div>
    );
  }


  return (
    <div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min md:mx-auto md:max-w-[500px]">
        <div className="p-1">
          <Card>
            <CardContent className="flex aspect-video items-center justify-center p-6">
              <span className="text-4xl font-semibold text-right">{currentQuestion.question}</span>
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
                  {currentQuestion.type === 'choose_multiple' && 'اختر متعدد'}
                  {currentQuestion.type === 'choose_correct' && 'اختر إجابة واحدة'}
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
                <h1> ملء الفراغ</h1>
                <FillGapSwappable
                  currentQuestion={currentQuestion}

                  onFillGap={(e) => selectAnswer(e)}
                  selectedAnswers={selectedAnswers}
                  isAnswered={isAnswered}
                />
              </>
            )}
            {currentQuestion.type === 'correct_incorrect' && (
              <>
                <h1>صحح هذه الإجابات الخاطئة</h1>
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
                <h1>ترتيب الكلمات</h1>
                <OrderAnswers
                  currentQuestion={currentQuestion}
                  onAnswerChange={(answers) => {
                    selectAnswer(answers)
                  }}
                  isAnswered={isAnswered}
                />
              </>
            )}
            {currentQuestion.type === 'recap_exercise' && (
              <>
                <h1>تصنيف الكلمات</h1>
                <ClassifyAnswers
                  currentQuestion={currentQuestion}
                // isAnswered={isAnswered} 
                />

              </>
            )}
          </div>
          {isAnswered && (
            <FeedbackDrawer
              isCorrect={isCorrect!}
              description={
                isCorrect
                  ? "أحسنت! لقد حصلت على الإجابة الصحيحة."
                  : "حظا أوفر في المرة القادمة! انظر الإجابة الصحيحة أدناه."
              }
              corrections={!isCorrect ? currentQuestion.corrections : undefined} // Show corrections if incorrect
              score={score}
              onNext={goToNextQuestion}
            />
          )}
          {!isAnswered && (
            <div className="flex justify-end pt-4">
              <Button onClick={submitAnswer} disabled={selectedAnswers.length === 0}>
                إجابة
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
