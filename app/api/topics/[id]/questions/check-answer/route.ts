import { topics } from '@/lib/quizzesDB';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { id, questionId, answer } = await req.json();

  const topic = topics.find((t) => t.id === parseInt(id));
  if (!topic) {
    return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
  }

  const question: any = topic.questions.find((q) => q.id === parseInt(questionId)); // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!question) {
    return NextResponse.json({ message: 'Question not found' }, { status: 404 });
  }

  let isCorrect = false;

  switch (question.type) {
    case 'choose_correct':
      isCorrect = question.correctAnswer === answer;
      break;

    case 'choose_multiple':
      isCorrect =
        Array.isArray(answer) &&
        answer.sort().join(',') === question.correctAnswers.sort().join(',');
      break;

    case 'fill_gap': 
      isCorrect = (question.correctAnswer as any).toLowerCase() === answer.toLowerCase(); // eslint-disable-line @typescript-eslint/no-explicit-any
      break;

    case 'order_answers':
      isCorrect =
        Array.isArray(answer) &&
        JSON.stringify(answer) === JSON.stringify(question.correctOrder);
      break;

    default:
      return NextResponse.json(
        { message: 'Invalid question type' },
        { status: 400 }
      );
  }

  return NextResponse.json({ isCorrect, correctAnswer: question.correctAnswer });
}
