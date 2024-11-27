import { topics } from '@/lib/quizzesDB';
import { NextResponse } from 'next/server';

export async function GET() {
  const topicList = topics.map(({ id, name }) => ({ id, name }));
  return NextResponse.json(topicList, { status: 200 });
}
