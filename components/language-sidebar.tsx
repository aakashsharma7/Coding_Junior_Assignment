"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Language } from "@/lib/types";
import {
  FileCode,
  FileJson,
  FileType2,
  Database,
  FileType,
  Cog,
  Scroll,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface LanguageSidebarProps {
  selectedLanguage: Language;
  onLanguageSelect: (language: Language) => void;
}

const languages = [
  { id: "python" as Language, name: "Python", Icon: FileCode },
  { id: "javascript" as Language, name: "JavaScript", Icon: FileJson },
  { id: "typescript" as Language, name: "TypeScript", Icon: FileType2 },
  { id: "cpp" as Language, name: "C++", Icon: Database },
  { id: "php" as Language, name: "PHP", Icon: FileType },
  { id: "go" as Language, name: "Go", Icon: Cog },
  { id: "rust" as Language, name: "Rust", Icon: Scroll },
  { id: "swift" as Language, name: "Swift", Icon: Zap },
];

export function LanguageSidebar({
  selectedLanguage,
  onLanguageSelect,
}: LanguageSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex flex-col items-center py-4 gap-2 w-16 border-r bg-muted/50">
        {languages.map((lang) => {
          const Icon = lang.Icon;
          return (
            <Tooltip key={lang.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedLanguage === lang.id ? "secondary" : "ghost"}
                  size="icon"
                  className={cn(
                    "h-12 w-12",
                    selectedLanguage === lang.id &&
                      "bg-gray-200 hover:bg-gray-300 dark:bg-secondary dark:hover:bg-secondary/80"
                  )}
                  onClick={() => onLanguageSelect(lang.id)}
                >
                  <Icon className="h-6 w-6" />
                  <span className="sr-only">{lang.name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-sm">
                {lang.name}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Toggle button for smaller screens */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-1  z-50"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? null : <Menu className="h-6 w-6" />}
        </Button>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={toggleSidebar}
          />
        )}

        <div
          className={cn(
            "fixed top-0 left-0 h-full z-50 bg-muted/90 w-28 transform transition-transform",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex justify-end p-2">
            <Button
              variant="ghost"
              size="icon"
              className="z-50"
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col items-center py-4 gap-4 ">
            {languages.map((lang) => {
              const Icon = lang.Icon;
              return (
                <Tooltip key={lang.id} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={
                        selectedLanguage === lang.id ? "secondary" : "ghost"
                      }
                      size="icon"
                      className={cn(
                        "h-12 w-12",
                        selectedLanguage === lang.id &&
                          "bg-black/10 dark:bg-black/40 hover:bg-secondary/80"
                      )}
                      onClick={() => {
                        onLanguageSelect(lang.id);
                        toggleSidebar();
                      }}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="sr-only">{lang.name}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="text-sm">
                    {lang.name}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
