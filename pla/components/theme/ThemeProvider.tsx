"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type ColorMode = "light" | "dark";

export const COLOR_MODE_STORAGE_KEY = "pla-color-mode";
export const COLOR_MODE_CHANGE_EVENT = "pla-color-mode-change";

type ColorModeContextValue = {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextValue | null>(null);

function getColorModeSnapshot(): ColorMode {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.localStorage.getItem(COLOR_MODE_STORAGE_KEY) === "dark"
    ? "dark"
    : "light";
}

function subscribeToColorMode(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(COLOR_MODE_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(COLOR_MODE_CHANGE_EVENT, onStoreChange);
  };
}

function writeColorMode(mode: ColorMode) {
  window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode);
  window.dispatchEvent(new Event(COLOR_MODE_CHANGE_EVENT));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const colorMode = useSyncExternalStore<ColorMode>(
    subscribeToColorMode,
    getColorModeSnapshot,
    () => "light",
  );

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", colorMode === "dark");
    root.dataset.theme = colorMode;
    root.style.colorScheme = colorMode;
  }, [colorMode]);

  const value = useMemo<ColorModeContextValue>(
    () => ({
      colorMode,
      setColorMode: writeColorMode,
      toggleColorMode: () => writeColorMode(colorMode === "dark" ? "light" : "dark"),
    }),
    [colorMode],
  );

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error("useColorMode must be used inside ThemeProvider.");
  }

  return context;
}
