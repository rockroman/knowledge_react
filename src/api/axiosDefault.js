import axios from "axios";

axios.defaults.baseURL =
  "https://new-knowledge-drf-8306ad9fb55b.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;