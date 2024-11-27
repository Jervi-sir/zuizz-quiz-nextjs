import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

const Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

interface QuestionCardProps {
  option: string;
  index: number;
  isCorrect?: boolean | null;
  onChoose: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export const QuestionCard = ({
  option,
  index,
  isCorrect = null,
  onChoose,
  selected = false,
  disabled = false,
}: QuestionCardProps) => {
  return (
    <button
      onClick={disabled ? undefined : onChoose}
      className={`group w-full border ${
        selected
          ? isCorrect === true
            ? 'border-green-500 bg-green-50'
            : isCorrect === false
            ? 'border-red-500 bg-red-50'
            : 'border-blue-500 bg-blue-50'
          : 'border-gray-300'
      } hover:border-blue-500 hover:ring-blue-500 transition ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled}
    >
      <Card>
        <CardHeader className="p-4">
          <div className="relative flex items-start gap-3">
            <Button variant="outline" size="sm">
              {Alphabet[index]}
            </Button>
            <div className="pt-[5px]">
              <CardDescription>{option}</CardDescription>
            </div>
            {isCorrect !== null && (
              <div className="absolute right-0 top-1">
                {isCorrect 
                  ? <CheckCircle color="green" /> 
                  : (
                    selected
                    ? <XCircle color="red" />
                    : null
                  )
                }
              </div>
            )}
          </div>
        </CardHeader>
      </Card>
    </button>
  );
};
