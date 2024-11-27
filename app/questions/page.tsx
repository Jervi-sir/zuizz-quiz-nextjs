'use client'

import { GameOptions } from "@/components/GameOptions";
import { QuestionCard } from "@/components/QuestionCard";
import { QuestionNavigation } from "@/components/QuestionNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGameProgress } from "@/context/GameProgressContext";

export default function GameScren() {
  const { progress } = useGameProgress();
  return (
    <>
      <QuestionNavigation />
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
        <div className="p-1">
          <Card>
            <CardContent className="flex aspect-video items-center justify-center p-6">
              <span className="text-4xl font-semibold">{1}</span>
            </CardContent>
          </Card>
          <div className="p-1 pt-4">
            <Progress value={progress} />
          </div>
          <div className="pt-3 flex flex-col gap-3">
            <QuestionCard />
            <GameOptions />
          </div>
        </div>
      </div>
    </>
  )
}
