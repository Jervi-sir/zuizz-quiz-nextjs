import { Input } from "@/components/ui/input";

export const CorrectIncorrect = ({
  currentQuestion,
  onCorrectOption,
  selectedAnswers,
  isAnswered,
}: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <div className="flex flex-col gap-4">
      {currentQuestion.incorrectOptions.map((option: string, index: number) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold">Incorrect Option:</span>
            <span className="">{option}</span>
          </div>
          <Input
            type="text"
            className="border rounded px-2 py-1 w-full text-right"
            placeholder="قدم الإجابة الصحيحة"
            value={selectedAnswers[index] || ''}
            disabled={isAnswered}
            onChange={(e) =>
              onCorrectOption({ incorrectIndex: index, correction: e.target.value })
            }
          />
        </div>
      ))}
    </div>
  );
};
