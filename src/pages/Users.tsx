import React from "react";
import Layout from '../components/layouts/Layout';
import { Users } from "../components/user/Users";

const UserView:React.FC=()=>{
    return(
       <Layout>
            <Users/>
       </Layout>
    )
}

export default UserView;