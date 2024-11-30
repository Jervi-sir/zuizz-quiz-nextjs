import { useState } from "react";

export const FillGapSwappable = ({
  currentQuestion,
  onFillGap,
  selectedAnswers,
  isAnswered,
}: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const [selectedGapIndex, setSelectedGapIndex] = useState<number | null>(0);

  const handleGapClick = (index: number) => {
    setSelectedGapIndex(index);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (selectedGapIndex !== null) {
      onFillGap({ gapIndex: selectedGapIndex, answer: suggestion });
      setSelectedGapIndex(null); // Optional: Reset after selection
    }
  };

  return (
    <div className="flex flex-col gap-4 px-2">
      <div>
        {currentQuestion.gaps.map((gap, index) => (
          <div
            key={index}
            className={`flex items-center justify-end gap-4 cursor-pointer py-2 rounded ${
              selectedGapIndex === index ? "bg-neutral-800" : ""
            }`}
            onClick={() => handleGapClick(index)}
          >
            <span className="text-nowrap">{gap.text}</span>
            <div
              className={`border rounded px-3 py-1 text-right ${
                isAnswered ? "bg-neutral-600" : "bg-black"
              }`}
            >
              {selectedAnswers[index] || "____"}
            </div>
          </div>
        ))}
      </div>
      <div>
        <h4 className="text-right">اقتراحات</h4>
      </div>
      <div className="flex  flex-row-reverse gap-4 flex-wrap">
        {currentQuestion.suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="px-3 py-1 border rounded bg-black hover:bg-neutral-600"
            onClick={() => handleSuggestionClick(suggestion)}
            disabled={isAnswered}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
