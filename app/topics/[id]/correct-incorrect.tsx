export const CorrectIncorrect = ({
  currentQuestion,
  onCorrectOption,
  selectedAnswers,
  isAnswered,
}: any) => {
  return (
    <div className="flex flex-col gap-4">
      {currentQuestion.incorrectOptions.map((option: string, index: number) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">Incorrect Option:</span>
            <span>{option}</span>
          </div>
          <input
            type="text"
            className="border rounded px-2 py-1 w-full"
            placeholder="Provide the correct answer"
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
