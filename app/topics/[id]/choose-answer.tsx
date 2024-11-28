import { QuestionCard } from "@/components/QuestionCard";

export const ChooseAnswer = ({
  currentQuestion,
  onSelectAnswer,
  isAnswered,
  isCorrect,
  selectedAnswers,
}) => {
  const isMultipleChoice = currentQuestion.type === "choose_multiple";

  return (
    <>
      {currentQuestion.options.map((option, index) => (
        <QuestionCard
          key={index}
          option={option}
          index={index}
          onChoose={() => onSelectAnswer(index)}
          isCorrect={
            isAnswered
              ? isCorrect
                ? selectedAnswers.includes(index) // Highlight selected correct answers
                : isMultipleChoice
                ? currentQuestion.correctAnswers?.includes(index) // Highlight all correct answers
                : index === currentQuestion.correctAnswer // Highlight correct single choice
              : null
          }
          selected={selectedAnswers.includes(index)}
          disabled={isAnswered}
        />
      ))}
    </>
  );
};
