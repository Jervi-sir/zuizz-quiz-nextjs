import { ArrowLeft, Bookmark } from "lucide-react";
import { Button } from "./ui/button";

export const QuestionNavigation = () => {
  return (
    <>
      <div className="flex justify-between items-center p-1">
        <Button size="sm">
          <ArrowLeft />
        </Button>
        <div className="text-white">Question</div>
        <Button size="sm">
          <Bookmark />
        </Button>
      </div>
    </>
  );
};