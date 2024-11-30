'use client';

import Subject from '@/components/custom/Subject';
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { useQuiz } from '@/context/QuizContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';

export default function Topics() {
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
              <span className="text-4xl font-semibold">المواضيع</span>
            </CardContent>
          </Card>
          <div className="pt-3 flex flex-col gap-3">
            {
              topics.length === 0
                ?
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                </>
                :
                topics.map((topic) => (
                  <div key={topic.id}>
                    <Subject topic={topic} />
                  </div>
                ))
            }
          </div>
          <ScoresList />
        </div>
      </div>
    </>
  );
}


const SkeletonCard = () => {
  return (
    <>
      <div className="flex items-center w-[100%] space-x-4">
        <div className="space-y-2 w-[100%]">
          <Skeleton className="h-16 w-[100%] md:w-[300px]" />
        </div>
      </div>
    </>
  )
}

const ScoresList = () => {
  const { getSavedScores, clearSavedScores } = useQuiz();
  const [showDialog, setShowDialog] = useState(false); // State to control the dialog visibility

  const savedScores = getSavedScores();

  const handleClear = () => {
    clearSavedScores();
    setShowDialog(false); // Close the dialog after clearing scores
  };

  return (
    <div className="mt-4 px-2">
      <h2>Saved Scores</h2>
      <ul>
        {savedScores.map((record, index) => (
          <li key={index} className="flex flex-row justify-end gap-3 py-2">
            <Badge variant="outline">{record.date}</Badge>
            {record.score < 3 && (
              <Badge className="bg-red-800 text-white">{record.score} / 5</Badge>
            )}
            {record.score === 3 && (
              <Badge className="bg-yellow-800 text-white">{record.score} / 5</Badge>
            )}
            {record.score === 4 && (
              <Badge className="bg-orange-800 text-white">{record.score} / 5</Badge>
            )}
            {record.score === 5 && (
              <Badge className="bg-green-800 text-white">{record.score} / 5</Badge>
            )}
            <Badge variant="outline">{record.topic}</Badge>
          </li>
        ))}
      </ul>
      {savedScores.length > 0 && (
        <Button
          onClick={() => setShowDialog(true)} // Open the dialog
          variant="outline"
          className="w-full mt-5"
        >
          Clear Scores
        </Button>
      )}

      {/* Confirmation Dialog */}
      {showDialog && (
        <Dialog>
          <DialogHeader>Confirm Clear Scores</DialogHeader>
          <DialogContent>
            Are you sure you want to clear all saved scores? This action cannot be undone.
          </DialogContent>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)} // Close the dialog
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 text-white"
              onClick={handleClear} // Clear the scores
            >
              Clear Scores
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
};
