import { useState, useCallback, useContext, createContext } from "react";

const KEY = "codeleap_username";

interface UsernameContextValue {
  username: string;
  setUsername: (name: string) => void;
  clearUsername: () => void;
}

export const UsernameContext = createContext<UsernameContextValue | null>(null);

export function useUsernameProvider() {
  const [username, setUsernameState] = useState<string>(
    () => localStorage.getItem(KEY) ?? ""
  );

  const setUsername = useCallback((name: string) => {
    localStorage.setItem(KEY, name);
    setUsernameState(name);
  }, []);

  const clearUsername = useCallback(() => {
    localStorage.removeItem(KEY);
    setUsernameState("");
  }, []);

  return { username, setUsername, clearUsername };
}

export function useUsername() {
  const context = useContext(UsernameContext);
  if (!context) {
    throw new Error("useUsername must be used within a UsernameProvider");
  }
  return context;
}
