import { createContext } from "react";
import { Place } from "../../places/placesInterFace";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  userId: "",
  setUserId: (id: string, token: string, expirationDate?: Date | string) => {},
  places: <Place[]>[],
  token: "",
});
