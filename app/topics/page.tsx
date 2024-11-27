'use client';

import Subject from '@/components/custom/Subject';
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGameProgress } from "@/context/GameProgressContext";

export default function Topics() {
  const { progress } = useGameProgress();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await fetch('/api/topics');
      const data = await response.json();
      setTopics(data);
    };

    fetchTopics();
  }, []);

  return (
    <>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
        <div className="p-1">
          <Card>
            <CardContent className="flex aspect-video items-center justify-center p-6">
              <span className="text-4xl font-semibold">Topics</span>
            </CardContent>
          </Card>
          <div className="pt-3 flex flex-col gap-3">
            {topics.map((topic) => (
              <div key={topic.id}>
                <Subject topic={topic} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}
