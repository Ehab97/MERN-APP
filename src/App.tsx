import { useState,useCallback} from 'react'
import Routing from './routes/index';
import { AuthContext } from './components/shared/context/auth.context';
import './App.css'


function App() {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const login = useCallback(() => {
    setIsLoggedIn(true);
 }, []);
 
 const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout}}>
        <Routing />
    </AuthContext.Provider>
  )
}

export default App
