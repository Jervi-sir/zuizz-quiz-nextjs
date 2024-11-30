'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


export const OrderAnswers = ({ 
  currentQuestion, 
  isAnswered = false,
  onAnswerChange
}) => {
  // Function to shuffle an array
  const shuffleArray = (array: number[]) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  // Initialize selectedAnswers with initial option indices for each sentence
  const [selectedAnswers, setSelectedAnswers] = useState<number[][]>(
    currentQuestion.sentences.map(sentence => 
      shuffleArray(sentence.options.map((_, index) => index))
    )
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (sentenceIndex: number, event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const currentSentenceAnswers = selectedAnswers[sentenceIndex];
      const oldIndex = currentSentenceAnswers.indexOf(Number(active.id));
      const newIndex = currentSentenceAnswers.indexOf(Number(over.id));

      const reorderedAnswers = arrayMove(
        currentSentenceAnswers,
        oldIndex,
        newIndex
      );

      // Create a new array that preserves other sentences' answers
      const newAnswers = [...selectedAnswers];
      newAnswers[sentenceIndex] = reorderedAnswers;

      setSelectedAnswers(newAnswers);

      // Notify parent component about answer changes if callback is provided
      if (onAnswerChange) {
        onAnswerChange(newAnswers);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">{currentQuestion.question}</h2>
      {currentQuestion.sentences.map((sentence, sentenceIndex) => (
        <div key={sentenceIndex} className="flex flex-col gap-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => handleDragEnd(sentenceIndex, event)}
          >
            <SortableContext
              items={selectedAnswers[sentenceIndex].map(String)}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex gap-2 flex-wrap" dir='rtl'>
                {selectedAnswers[sentenceIndex].map((optionIndex) => (
                  <SortableItem
                    key={optionIndex}
                    id={String(optionIndex)}
                    text={sentence.options[optionIndex]}
                    isAnswered={isAnswered}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      ))}
    </div>
  );
};

const SortableItem = ({ 
  id, 
  text, 
  isAnswered 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        border rounded px-4 py-2 text-right 
        bg-black text-white shadow-sm 
        ${isAnswered ? 'cursor-not-allowed' : 'cursor-move'}
      `}
    >
      {text}
    </div>
  );
};

// Example usage in a page or component
export default function OrderAnswerPage() {
  const mockQuestion = {
    id: 3,
    type: "order_answers",
    question: "أعد ترتيب الكلمات التالية",
    sentences: [
      {
        options: ["ظهور", "هيئة", "الأمم", "المتحدة."],
        correctOrder: [0, 1, 2, 3],
      },
      {
        options: ["القضاء", "على", "الدكتاتوريات."],
        correctOrder: [0, 1, 2],
      },
    ],
    corrections: [
      "ظهور هيئة الأمم المتحدة",
      "القضاء على الدكتاريات",
    ]
  };

  const handleAnswerChange = (answers: number[][]) => {
    console.log('Current Answers:', answers);
  };

  return (
    <div className="p-6">
      <OrderAnswers 
        currentQuestion={mockQuestion} 
        onAnswerChange={handleAnswerChange}
      />
    </div>
  );
}