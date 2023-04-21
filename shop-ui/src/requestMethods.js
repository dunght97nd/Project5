import axios from "axios";
import jwt_decode from "jwt-decode";

const BASE_URL = "http://localhost:5000/api";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = () =>
  axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
  });
//----------------------------------------------------------------

export const createAxios = (currentUser, dispatch, stateSuccess) => {
  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/refresh", {
        token: currentUser.refreshToken,
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(currentUser.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        const user = {
          ...currentUser,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
        dispatch(stateSuccess(user));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosJWT;
};
