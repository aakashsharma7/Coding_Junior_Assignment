"use client";

import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { rust } from "@codemirror/lang-rust";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Play, Loader } from "lucide-react";
import { Language } from "@/lib/types";
import { ThemeToggle } from "./theme-toggle";

interface CodeEditorProps {
  language: Language;
  onRunCode: (code: string) => void;
}

const languageMap = {
  javascript: javascript(),
  typescript: javascript({ typescript: true }),
  python: python(),
  cpp: cpp(),
  php: php(),
  rust: rust(),
  go: javascript(), // Fallback
  swift: javascript(), // Fallback
};

const defaultCode = {
  python: '# Write your Python code here\nprint("Coding Junior")',
  javascript:
    '// Write your JavaScript code here\nconsole.log("Hello, Coding Junior!");',
  typescript: '// Write your TypeScript code here\nconsole.log("Hi, World!");',
  cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello Everyone" << std::endl;\n    return 0;\n}',
  php: '<?php\n// Write your PHP code here\necho "Hello, World!";',
  rust: 'fn main() {\n    println!("Hello, World!");\n}',
  go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
  swift: 'print("Hello, World!")',
};

export function CodeEditor({ language, onRunCode }: CodeEditorProps) {
  const { theme } = useTheme();
  const [code, setCode] = useState(defaultCode[language]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCode(defaultCode[language]);
  }, [language]);

  const handleChange = (value: string) => {
    setCode(value);
  };

  const handleRunCode = async () => {
    setLoading(true);
    try {
      await onRunCode(code);
    } catch (error) {
      console.error("Error while running code:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex items-center justify-between py-1 px-[0.53rem] bg-background border-b">
        <h1 className="md:text-lg text-sm md:flex hidden font-bold ">
          Code Junior Compiler
        </h1>
        <h1 className="ml-8 md:hidden font-bold flex"> Code Junior Compiler</h1>
        <div>
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-16 gap-1 ml-2 hover:bg-gray-500/10"
            onClick={handleRunCode}
            disabled={loading}
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={code}
          height="100%"
          theme={theme === "dark" ? githubDark : githubLight}
          extensions={[languageMap[language]]}
          onChange={handleChange}
          className="h-full max-w-full overflow-auto"
        />
      </div>
    </div>
  );
}
