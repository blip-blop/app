import axios from "axios";
const API_URL = "http://localhost:5000/api/jobs";

const postOffer = async (jobData) => {
  const response = await axios.post(API_URL + "/addjob", jobData);
  if (response.data) {
    console.log(response.data);
  }

  return response.data;
};

const postService = {
  postOffer,
};
