"use client";

import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface OutputHeaderProps {
  onClear: () => void;
}

export function OutputHeader({ onClear }: OutputHeaderProps) {
  return (
    <div className="flex items-center justify-between p-2 border-b bg-muted">
      <h2 className="text-sm font-semibold">Output</h2>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-16 hover:bg-gray-500/10"
            onClick={onClear}
          >
            Clear
          </Button>
        </TooltipTrigger>
        <TooltipContent>Clear output</TooltipContent>
      </Tooltip>
    </div>
  );
}
