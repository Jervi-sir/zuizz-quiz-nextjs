"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface FeedbackDrawerProps {
  isCorrect: boolean; // Whether the user's answer was correct
  description: string; // A message or hint for the user
  score: number; // Current score
  onNext: () => void; // Function to navigate to the next question
}

export function FeedbackDrawer({
  isCorrect,
  description,
  score,
  onNext,
}: FeedbackDrawerProps) {
  return (
    <Drawer open={true} dismissible={false}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              {isCorrect ? "Correct!" : "Incorrect"}
            </DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex-1 text-center">
                <div
                  className={`text-7xl font-bold tracking-tighter ${
                    isCorrect ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isCorrect ? "✅" : "❌"}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Current Score: {score}
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={onNext}>Next</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}