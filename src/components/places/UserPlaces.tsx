import React from 'react'
import PlaceList from './PlaceList';
import { Place } from './placesInterFace';
import { useParams } from 'react-router-dom';
import '../../styles/places.scss'
// interface Places{
//     places:Place[];
// }

const places:Place[] = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    creatorId: 'u1',
    coordinates: {
      lat: '40.7484405',
      lng: '-73.9878584'
    }
  },{
    id: 'p2',
    title: 'Empire State Building 2',
    description: 'One of the most famous sky scrapers in the world! 2' ,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    creatorId: 'u2',
    coordinates: {
      lat: '40.7484405',
      lng: '-73.9878584'
    }
  }
]
let userPlacesFiltered:Place[]|null|undefined=null;
const UserPlaces:React.FC = () => {
  let {userId}=useParams();
  const [loading,setLoading]=React.useState(true)
  React.useEffect(() => {
     userPlacesFiltered = places?.filter(place => place.creatorId !== userId);
     setLoading(false) 
    },[userId])
    if(loading){
      return <p>Loading...</p>
      }

    return (
      <>
      {userPlacesFiltered&&<PlaceList places={userPlacesFiltered}/>}
      </>
  )
}

export default UserPlaces