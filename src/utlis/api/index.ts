import axios from "axios";

let baseURL_: any = "";
let basURLImage: any = "";
if (process.env.NODE_ENV !== "production") {
  baseURL_ = "http://localhost:5000/api/";
  basURLImage = "http://localhost:5000/";
} else {
  baseURL_ = "https://places-app-fullstack.herokuapp.com/api/";
  basURLImage = "https://places-app-fullstack.herokuapp.com/";
}
export { baseURL_, basURLImage };
const baseURL: string = "http://localhost:5000/";

const client = axios.create({
  baseURL,
});

export default client;
