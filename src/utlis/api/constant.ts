export const baseURL = () => {
  let baseURL: any = "";
  if (process.env.NODE_ENV !== "production") {
    baseURL = "http://localhost:5000/api/";
  } else {
    baseURL = process.env.REACT_APP_BACKEND_URL;
  }
  return baseURL;
};
