import { Input } from "@/components/ui/input";

export const FillGap = ({ currentQuestion, onFillGap, selectedAnswers, isAnswered }: any) => {
  return (
    <div className="flex flex-col gap-4">
      {currentQuestion.gaps.map((gap, index) => (
        <div key={index} className="flex items-center gap-2">
          <span>{gap.text}</span>
          <Input 
            type="text"
            className="border rounded px-2 py-1"
            value={selectedAnswers[index] || ''}
            disabled={isAnswered}
            onChange={(e) => onFillGap({ gapIndex: index, answer: e.target.value })}
          />
        </div>
      ))}
    </div>
  );
};
