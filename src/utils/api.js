import axios from "axios";

const { REACT_APP_API_URL } = process.env;

console.log(REACT_APP_API_URL);

export default axios.create({
  baseURL: REACT_APP_API_URL,
});
