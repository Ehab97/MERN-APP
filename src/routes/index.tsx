import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import UserView from "../pages/Users";
// import Places from "../pages/Places";
// import UserPlacesView from "../pages/UserPlacesView";
// import UpdatePlaceView from "../pages/UpdatePlaceView";

import { AuthView } from "../pages/AuthView";
import { AuthContext } from "../components/shared/context/auth.context";
import LoadingSpinner from "../components/shared/UIElements/LoadingSpinner";

const UserPlacesView = React.lazy(() => import("../pages/UserPlacesView"));
const Places = React.lazy(() => import("../pages/Places"));
const UpdatePlaceView = React.lazy(() => import("../pages/UpdatePlaceView"));

interface RouteType {
  path: string;
  component: React.ComponentType;
}

const Routing: React.FC = () => {
  const auth = React.useContext(AuthContext);
  let routes: any = [];
  const { isLoggedIn, token } = auth;
  const isAuthed = () => (
    <Routes>
      <Route path="/" element={<UserView />} />
      <Route path="/:userId/places" element={<UserPlacesView />} />
      <Route path="/places/new" element={<Places />} />
      <Route path="/places/:placeId/" element={<UpdatePlaceView />} />
      <Route path="/auth/" element={<AuthView />} />
      <Route path="*" element={<UserView />} />
    </Routes>
  );
  const notAuthed = () => (
    <Routes>
      <Route path="/" element={<UserView />} />
      <Route path="/:userId/places" element={<UserPlacesView />} />
      <Route path="/auth/" element={<AuthView />} />
      <Route path="*" element={<AuthView />} />
    </Routes>
  );
  return (
    <Suspense
      fallback={
        <div className={"center"}>
          <LoadingSpinner asOverlay={true} />
        </div>
      }
    >
      {token ? isAuthed() : notAuthed()}
    </Suspense>
  );
};
export default Routing;
