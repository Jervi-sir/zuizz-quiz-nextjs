import { topics } from '@/lib/quizzesDB';
import { NextResponse } from 'next/server';

export async function GET() {
  const topicList = topics.map(({ id, name, icon }) => ({ id, name, icon }));
  return NextResponse.json(topicList, { status: 200 });
}
