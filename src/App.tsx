import Routing from "./routes/index";
import { AuthContext } from "./components/shared/context/auth.context";
import LoadingSpinner from "./components/shared/UIElements/LoadingSpinner";
import { useAuth } from "./app/hooks/useAuth";

import "./App.css";

function App() {
  const { login, logout, setUserId, userId, token, places, isLoading } =
    useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        login,
        logout,
        userId,
        setUserId,
        places,
        token,
      }}
    >
      {isLoading && <LoadingSpinner asOverlay={true} />}
      <Routing />
    </AuthContext.Provider>
  );
}

export default App;
