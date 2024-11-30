"use client";

import { useEffect } from "react";
import { createSwapy } from "swapy";

//, onFillGap, selectedAnswers, isAnswered
export const FillGapSwappable = ({ currentQuestion }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  useEffect(() => {
    const container = document.querySelector(".container")!;
    const swapy = createSwapy(container);

    swapy.onSwap(({ data }) => {
      localStorage.setItem("slotItem", JSON.stringify(data.object));
    });

    return () => {
      swapy.destroy();
    };
  }, []);

  return (
    <div className="container">
      {currentQuestion.gaps.map((gap, index) => (
        <div key={index} className="flex items-center gap-4">
          <span className="text-nowrap">{gap.text}</span>
          <div className="bg-black flex-1 w-full h-10" data-swapy-slot={index}>
            <div className="bg-gray-800 p-2 " data-swapy-slot={index}>
              <></>
            </div>
          </div>
          {/* <Input
            type="text"
            className="border rounded px-3 py-1 text-right"
            value={selectedAnswers[index] || ''}
            disabled={isAnswered}
            onChange={(e) => onFillGap({ gapIndex: index, answer: e.target.value })}
          /> */}
        </div>
      ))}
      {/* Suggestions */}
      <div className="flex flex-row flex-wrap gap-2">
        {
          currentQuestion.suggestions.map((item,index) => (
            <div className="bg-gray-800 p-2 " data-swapy-slot={index} key={index}>
              <Item id={index} label={item} />
            </div>
          ))
        }
      </div>
    </div>
  );
}


const Item = ({ id, label }) => {
  return (
    <div
      className={` text-white text-xl cursor-pointer select-none`}
      data-swapy-item={id}
    >
      <div>{label}</div>
    </div>
  );
};
