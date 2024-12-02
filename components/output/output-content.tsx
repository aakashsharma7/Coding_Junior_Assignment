"use client";

import { ScrollArea } from "../ui/scroll-area";

interface OutputContentProps {
  content: string;
}

export function OutputContent({ content }: OutputContentProps) {
  return (
    <ScrollArea className="h-[calc(100%-2.5rem)]">
      <pre className="p-4 font-mono text-sm whitespace-pre-wrap break-words">
        {content || "No output to display"}
      </pre>
    </ScrollArea>
  );
}