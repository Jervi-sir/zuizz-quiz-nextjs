import { topics } from '@/lib/quizzesDB';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const topic = topics.find((t) => t.id === parseInt(params.id));

  if (!topic) {
    return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
  }

return NextResponse.json({
  topic: {
    id: topic.id,
    name: topic.name,
    icon: topic.icon,
  },
  questions: topic.questions
}, { status: 200 });
}