import { Route, Routes} from 'react-router-dom';
import UserView from '../pages/Users';
import Places from '../pages/Places';

import UserPlacesView from '../pages/UserPlacesView';

import UpdatePlaceView from '../pages/UpdatePlaceView';
import { AuthView } from '../pages/AuthView';



interface RouteType {
  path: string;
  component: React.ComponentType;
}

const Routing: React.FC = () => {
  return(
    <Routes>    
      <Route path="/"                   element={<UserView />} />
      <Route path="/:userId/places"     element={<UserPlacesView/>} />
      <Route path="/places/new"         element={<Places />} />
      <Route path="/places/:placeId/"   element={<UpdatePlaceView />} />
      <Route path="/auth/"              element={<AuthView />} />
    </Routes>  
  )
}
export default Routing;