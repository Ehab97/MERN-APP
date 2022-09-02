import axios from "axios";

const baseURL:string="https://registry.npmjs.org/-/v1/"; 

const client = axios.create({
  baseURL
});

export default client;