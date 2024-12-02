"use client";

import { OutputHeader } from "./output/output-header";
import { OutputContent } from "./output/output-content";

interface OutputPanelProps {
  output: string;
  onClear: () => void;
}

export function OutputPanel({ output, onClear }: OutputPanelProps) {
  return (
    <div className="h-full overflow-hidden border-t bg-muted/50">
      <OutputHeader onClear={onClear} />
      <OutputContent content={output} />
    </div>
  );
}
