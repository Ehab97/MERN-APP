import { useState, useCallback, useRef, useEffect } from "react";

import { baseURL_ } from "../../utlis/api";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const activeHttpRequests = useRef<AbortController[]>([]);
  const sendRequest = useCallback(
    async (url: string, method: string = "GET", body?: any, headers?: {}) => {
      setIsLoading(true);
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);
      console.log(
        "process.env.REACT_APP_BACKEND_URL ",
        process.env.REACT_APP_BACKEND_URL,
        process.env.NODE_ENV
      );
      try {
        const response: any = await fetch(baseURL_ + url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortController
        );

        if (responseData.status !== "success") {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  const clearError = () => setError("");

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};
