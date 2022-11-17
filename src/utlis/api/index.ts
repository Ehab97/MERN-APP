import axios from "axios";

const baseURL:string="http://localhost:5000/";

const client = axios.create({
  baseURL
});

export default client;