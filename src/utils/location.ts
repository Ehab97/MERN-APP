import axios from 'axios';
import { nextTick } from 'process';
import HttpError from './../models/http-error';
const API_KEY:string='AIzaSyCwwLnetwv43XOq1JP2KuPmgy8C1YuinCU';

async function getCoordsForAddress(address:any){
   
    const response=await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
    const data=response.data;
    let error;
    if(!data || data.status==='ZERO_RESULTS'){
        error=new HttpError('Could not find location for the specified address',422);
        throw error;
    }
    return {
        lat:40.7484474,
        lng:-73.9871516
    }

   //in case we have billing enabled
    const coordinates=data.results[0].geometry?.location;
        console.log(coordinates);
        return coordinates;
}

export default getCoordsForAddress;