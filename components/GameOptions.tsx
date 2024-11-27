import { ChevronsRightIcon, TimerIcon } from "lucide-react";
import { Button } from "./ui/button";

export const GameOptions = () => {
  return (
    <div className="grid grid-cols-3 space-x-3 p-1">
      <div className="flex flex-col bg-orange-600 items-center rounded p-2">
        <span className="text-white text-sm">50/50</span>
        <span className="text-white text-sm">Answers</span>
      </div>
      <div className="flex flex-col bg-orange-600 items-center rounded p-2">
        <span className="text-white text-sm"><TimerIcon /></span>
        <span className="text-white text-sm">Add time</span>
      </div>
      <div className="flex flex-col bg-orange-600 items-center rounded p-2">
        <span className="text-white text-sm"><ChevronsRightIcon /></span>
        <span className="text-white text-sm">Skip</span>
      </div>
    </div>
  );
};