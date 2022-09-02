import React from "react";
import Layout from '../components/layouts/Layout';
import { NewPlace } from "../components/places/NewPlace";

const Places:React.FC=()=>{
    return(
       <Layout>
            <NewPlace/>
       </Layout>
    )
}

export default Places;