import React from 'react';
import { Route, Routes} from 'react-router-dom';
import UserView from '../pages/Users';
import Places from '../pages/Places';

import UserPlacesView from '../pages/UserPlacesView';

import UpdatePlaceView from '../pages/UpdatePlaceView';
import { AuthView } from '../pages/AuthView';
import { AuthContext } from '../components/shared/context/auth.context';



interface RouteType {
  path: string;
  component: React.ComponentType;
}

const Routing: React.FC = () => {
  const auth=React.useContext(AuthContext);
  let routes:any = [];
  const {isLoggedIn}=auth;
  if(isLoggedIn) {

  }else{

  }
  const isAuthed=()=>(
    <Routes>
      <Route path="/"                   element={<UserView />} />
      <Route path="/:userId/places"     element={<UserPlacesView/>} />
      <Route path="/places/new"         element={<Places />} />
      <Route path="/places/:placeId/"   element={<UpdatePlaceView />} />
      <Route path="/auth/"              element={<AuthView />} />
      <Route path="*"                   element={<UserView/>} />
    </Routes>
  )
  const notAuthed=()=>(
    <Routes>
      <Route path="/"                   element={<UserView />} />
      <Route path="/:userId/places"     element={<UserPlacesView/>} />
      <Route path="/auth/"              element={<AuthView />} />
      <Route path="*"                   element={<AuthView/>} />
    </Routes>
  )
  return(
    <>
       {isLoggedIn?isAuthed():notAuthed()}
    </>
  )
}
export default Routing;