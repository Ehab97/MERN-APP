import { useState, useCallback, useEffect } from "react";
import { Place } from "../../components/places/placesInterFace";
import { useHttpClient } from "./useHttpClient";

let logoutTimer: number;
export const useAuth = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>();
  const [places, setPlaces] = useState<Place[]>([]);
  const [token, setToken] = useState("");
  const [userId, setId] = useState("");
  const login = useCallback(() => {
    // setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    // setIsLoggedIn(false);
    localStorage.removeItem("userData");
    setTokenExpirationDate(null);
    setToken("");
    setId("");
  }, []);

  const setUserId = useCallback(
    (id: string, token: string, expirationDate?: Date | string) => {
      setId(id);
      setToken(token);
      const tokenExpirationDate: any =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: id,
          token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );

  useEffect(() => {
    const value = localStorage.getItem("userData");
    let currentToken = "";
    if (typeof value === "string") {
      const userData = JSON.parse(value);
      let { userId, token, expiration } = userData;
      currentToken = token;
      if (new Date(expiration) > new Date()) {
        login();
        setUserId(userId, token, new Date(expiration));
      }
    }

    (async () => {
      try {
        let res: any = await sendRequest("places", "GET", null, {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        });
        console.log(res);
        let placesData = res.data.places as Place[];
        setPlaces(placesData);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [setUserId]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      let remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(setUserId, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, setUserId, tokenExpirationDate]);

  return { token, setUserId, places, logout, login, userId, isLoading };
};
