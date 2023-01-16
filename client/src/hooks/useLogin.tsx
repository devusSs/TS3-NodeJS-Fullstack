import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch }: any = useAuthContext();

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError("");

    const url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
    const response = await fetch(url + "/clients/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });
    const json = await response.json();

    if (response.status !== 200) {
      setIsLoading(false);
      setError(json.error.message);
    }
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
