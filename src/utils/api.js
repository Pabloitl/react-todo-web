import axios from "axios";

const { REACT_APP_API_URL } = process.env;

export default axios.create({
    baseURL: "http://app.pvargas.com:8000/api/",
});
