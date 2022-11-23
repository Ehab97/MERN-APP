import { useState, useCallback, useEffect } from "react";
import Routing from "./routes/index";
import { AuthContext } from "./components/shared/context/auth.context";
import "./App.css";
import { useHttpClient } from "./app/hooks/useHttpClient";
import { Place } from "./components/places/placesInterFace";
import LoadingSpinner from "./components/shared/UIElements/LoadingSpinner";

function App() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setId] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const setUserId = useCallback((id: string) => {
    setId(id);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let res: any = await sendRequest("http://localhost:5000/api/places");

        console.log(res);

        let placesData = res.data.places as Place[];
        setPlaces(placesData);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userId, setUserId, places }}
    >
      {isLoading && <LoadingSpinner asOverlay={true} />}
      <Routing />
    </AuthContext.Provider>
  );
}

export default App;
