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
          {/* Display the incorrect option */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold">Incorrect Option:</span>
            <span className="">{option}</span>
          </div>

          {/* Render suggestions as clickable options */}
          <div className="flex flex-col gap-2">
            {currentQuestion.suggestions[index].map(
              (suggestion: string, suggestionIndex: number) => (
                <button
                  key={suggestionIndex}
                  className={`border rounded px-3 py-1 text-right ${
                    selectedAnswers[index] === suggestion
                      ? "bg-neutral-800 text-white" // Highlight the selected answer
                      : "bg-neutral-900 hover:bg-neutral-600"
                  }`}
                  onClick={() =>
                    onCorrectOption({ incorrectIndex: index, correction: suggestion })
                  }
                  disabled={isAnswered} // Disable if the question is already answered
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
