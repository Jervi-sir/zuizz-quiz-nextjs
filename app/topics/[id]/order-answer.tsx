'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface OrderAnswersProps {
  currentQuestion: {
    options: string[];
    correctOrder: number[];
  };
  selectedAnswers: number[];
  onReorder: (newOrder: number[]) => void;
  isAnswered: boolean;
}

export const OrderAnswers: React.FC<OrderAnswersProps> = ({
  currentQuestion,
  selectedAnswers,
  onReorder,
  isAnswered,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = selectedAnswers.indexOf(Number(active.id));
      const newIndex = selectedAnswers.indexOf(Number(over.id));
      const reordered = arrayMove(selectedAnswers, oldIndex, newIndex);
      onReorder(reordered);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={selectedAnswers.map(String)} // Use string IDs for items
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {selectedAnswers.map((index) => (
            <SortableItem
              key={index}
              id={String(index)}
              text={currentQuestion.options[index]}
              isAnswered={isAnswered}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

interface SortableItemProps {
  id: string;
  text: string;
  isAnswered: boolean;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, text, isAnswered }) => {
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
      className={`border rounded px-4 py-2 text-right bg-black shadow-sm ${
        isAnswered ? 'cursor-not-allowed' : 'cursor-move'
      }`}
    >
      {text}
    </div>
  );
};
