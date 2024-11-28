import { Input } from "@/components/ui/input";

export const FillGap = ({ currentQuestion, onFillGap, selectedAnswers, isAnswered }: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <div className="flex flex-col gap-4">
      {currentQuestion.gaps.map((gap, index) => (
        <div key={index} className="flex items-center gap-4">
          <span className="text-nowrap">{gap.text}</span>
          <Input 
            type="text"
            className="border rounded px-3 py-1 text-right"
            value={selectedAnswers[index] || ''}
            disabled={isAnswered}
            onChange={(e) => onFillGap({ gapIndex: index, answer: e.target.value })}
          />
        </div>
      ))}
    </div>
  );
};
