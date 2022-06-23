import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const loginUser = async (userData) => {
  const response = await axios.post(API_URL + "/login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(response.data);
  }

  return response.data;
};

const signupUser = async (userData) => {
  const response = await axios.post(API_URL + "/register", userData);
  if (response.data) {
    console.log(response.data);
  }

  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const userService = {
  loginUser,
  signupUser,
  logout,
};

export default userService;
