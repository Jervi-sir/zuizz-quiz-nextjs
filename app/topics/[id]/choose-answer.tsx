import { QuestionCard } from "@/components/QuestionCard";

export const ChooseAnswer = ({ currentQuestion, onSelectAnswer, isAnswered, isCorrect, selectedAnswers }) => {
  return (
    <>
      {
        currentQuestion.options.map((option, index) => (
          <QuestionCard
            key={index}
            option={option}
            index={index}
            onChoose={() => onSelectAnswer(index)}
            isCorrect={
              isAnswered
                ? isCorrect
                  ? selectedAnswers.includes(index) // Show only the selected correct answer
                  : currentQuestion.type === 'choose_multiple'
                    ? currentQuestion.correctAnswers?.includes(index) // Show correct answers for multiple choice
                    : index === currentQuestion.correctAnswer // Show correct answer for single choice
                : null
            }
            selected={selectedAnswers.includes(index)}
            disabled={isAnswered}
          />
        ))}
    </>
  );
};