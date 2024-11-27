'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from '@dnd-kit/core';
import { useQuiz } from '@/context/QuizContext';
import { CSS } from '@dnd-kit/utilities';

interface Criterion {
  text: string;
  category: string; // Correct category
}

interface ClassifyAnswersProps {
  currentQuestion: {
    criteria: Criterion[];
  };
  isAnswered: boolean;
}

const DraggableItem: React.FC<{ id: string; text: string }> = ({ id, text }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-black border rounded px-4 py-2 shadow cursor-pointer"
    >
      {text}
    </div>
  );
};

const DroppableArea: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="border rounded p-4 min-h-[100px] flex gap-2 flex-wrap"
    >
      {children}
    </div>
  );
};

export const ClassifyAnswers = ({ currentQuestion, isAnswered }) => {
  const { selectAnswer, selectedAnswers } = useQuiz();

  const categories = Array.from(
    new Set(currentQuestion.criteria.map((criterion) => criterion.category))
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const draggedItem = currentQuestion.criteria.find((c) => c.text === active.id);
      if (draggedItem) {
        selectAnswer({ text: draggedItem.text, category: over.id });
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col">
        <div className="flex gap-4">
          {categories.map((category) => (
            <div key={category} className="w-1/3">
              <h3 className="font-bold mb-2">{category}</h3>
              <DroppableArea id={category}>
                {Object.entries(selectedAnswers)
                  .filter(([text, assignedCategory]) => assignedCategory === category)
                  .map(([text]) => (
                    <DraggableItem key={text} id={text} text={text} />
                  ))}
              </DroppableArea>
            </div>
          ))}
          
        </div>
        <div className="">
          <h3 className="font-bold mb-2">Unclassified</h3>
          <DroppableArea id="unclassified">
            {currentQuestion.criteria
              .filter(
                (criterion) =>
                  selectedAnswers[criterion.text] === 'unclassified' ||
                  !selectedAnswers[criterion.text]
              )
              .map((criterion) => (
                <DraggableItem key={criterion.text} id={criterion.text} text={criterion.text} />
              ))}
          </DroppableArea>
        </div>
      </div>

    </DndContext>
  );
};