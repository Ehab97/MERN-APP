import React from "react";
import Layout from '../components/layouts/Layout';
import UserPlaces from "../components/places/UserPlaces";


const UserPlacesView:React.FC=()=>{
    return(
       <Layout>
            <UserPlaces/>
       </Layout>
    )
}

export default UserPlacesView;