"use client";

import { CodeEditor } from "@/components/code-editor";
import { LanguageSidebar } from "@/components/language-sidebar";
import { OutputPanel } from "@/components/output-panel";
import { useState } from "react";
import { Language } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("python");
  const [output, setOutput] = useState<string>("");
  const { toast } = useToast();

  const jdoodleLanguageMap: Record<Language, string> = {
    python: "python3",
    javascript: "nodejs",
    typescript: "typescript",
    go: "go",
    php: "php",
    swift: "swift",
    rust: "rust",
    cpp: "cpp",
  };

  const handleRunCode = async (code: string) => {
    try {
      const jdoodleLanguage = jdoodleLanguageMap[selectedLanguage] || "python3";

      const response = await fetch("/api/jdoodle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          script: code,
          language: jdoodleLanguage,
          versionIndex: "0",
        }),
      });

      if (!response.ok) {
        console.error("API call failed with status:", response.status);
        throw new Error(`API Credits expired`);
      }

      const result = await response.json();

      if (result.error) {
        console.error("Execution failed:", result.error);
        setOutput(`=== Error ===\n${result.error}`);
        toast({
          title: "Error",
          description: `Execution failed: ${result.error}`,
          variant: "destructive",
        });
        return;
      }

      setOutput(`=== Code Execution Successful ===\n${result.output}`);
      toast({
        title: "Success",
        description: "Code executed successfully",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setOutput(`=== Error ===\n${error.message}`);
      } else {
        setOutput("=== Error ===\nAn unknown error occurred.");
      }
      toast({
        title: "Error",
        description: "Failed to execute code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClearOutput = () => {
    setOutput("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className=" flex h-screen">
        <LanguageSidebar
          selectedLanguage={selectedLanguage}
          onLanguageSelect={setSelectedLanguage}
        />

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden h-full">
          <div className="flex-1 h-full overflow-hidden">
            <CodeEditor language={selectedLanguage} onRunCode={handleRunCode} />
          </div>
          <div className="flex-1 h-full overflow-auto">
            <OutputPanel output={output} onClear={handleClearOutput} />
          </div>
        </div>
      </div>
    </div>
  );
}
