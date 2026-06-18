"use client";

import { Moon, Sun } from "lucide-react";
import { useColorMode } from "./ThemeProvider";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <button
      type="button"
      onClick={toggleColorMode}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/85 text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.07] dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/[0.11] ${className}`}
      aria-label={`Passer en mode ${isDark ? "clair" : "sombre"}`}
      title={`Mode ${isDark ? "sombre" : "clair"}`}
    >
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
