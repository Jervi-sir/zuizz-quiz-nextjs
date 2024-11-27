import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect } from "react";


const Answer = ({
  optionLabel,
  optionId,
  handleSelectAnswer,
  isCorrectUserAnswer,
  supposedCorrectAnswer,
  isSelected
}) => {
  useEffect(() => {
    console.log('correctAnswer: ', supposedCorrectAnswer);
  }, [])
  return (
    <li>
      <button
        onClick={() => handleSelectAnswer(optionId)}
        className={cn(
          isSelected && "ring-purple ring-1",
          isCorrectUserAnswer && isSelected && "ring-green",

          "w-full flex items-center gap-x-4 group bg-[#fff] dark:bg-slate py-4 px-5 rounded-xl shadow-lg hover:ring-1 hover:ring-purple transition-all font-semibold text-sm text-dark-blue dark:text-white text-center",
          isCorrectUserAnswer === false && isSelected && "ring-red"
        )}
      >
        <span
          className={cn(
            isSelected
              ? "bg-purple text-white"
              : "bg-white dark:text-dark-blue group-hover:text-purple group-hover:bg-[#F6E7FF] transition-all",
            "text-lg rounded-lg py-2 px-4  ",
            isCorrectUserAnswer === false && isSelected && "bg-red",
            isCorrectUserAnswer && isSelected && "bg-green",
            supposedCorrectAnswer === optionId && "bg-green"
          )}
        >
          { optionLabel }
        </span>
        <span className="xl:text-lg">{optionId}</span>
        {isCorrectUserAnswer && isSelected && (
          <span className="text-green-500 ml-auto">
            <Image
              src="/assets/images/icon-correct.svg"
              alt="check"
              width={30}
              height={30}
            />
          </span>
        )}
        {isCorrectUserAnswer === false && isSelected && (
          <span className="text-red-500 ml-auto">
            <Image
              src="/assets/images/icon-error.svg"
              alt="cross"
              width={30}
              height={30}
            />
          </span>
        )}
      </button>
    </li>
  );
};

export default Answer;
