import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();
  const handleMount = async () => {
    // Check if a valid token exists before making the API call
    const token = localStorage.getItem("refreshTokenTimestamp"); // Adjust the key accordingly
    if (!token) {
      // No token, user is not logged in, no need to make the API call
      return;
    }
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleMount = async () => {
  //   try {
  //     const { data } = await axiosRes.get("dj-rest-auth/user/");
  //     setCurrentUser(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    handleMount();
  }, []);

  // useMemo(() => {
  //   axiosReq.interceptors.request.use(
  //     async (config) => {
  //       try {
  //         await axios.post("/dj-rest-auth/token/refresh/");
  //       } catch (err) {
  //         setCurrentUser((prevCurrentUser) => {
  //           if (prevCurrentUser) {
  //             history.push("/signin");
  //           }
  //           return null;
  //         });
  //         return config;
  //       }
  //       return config;
  //     },
  //     (err) => {
  //       return Promise.reject(err);
  //     }
  //   );

  //   axiosRes.interceptors.response.use(
  //     (response) => response,
  //     async (err) => {
  //       // // handling 403 errors
  //       // if (err.response?.status === 403) {
  //       //   history.push("/");
  //       //   console.log("FORBIDDEN");
  //       // }
  //       if (err.response?.status === 401) {
  //         try {
  //           await axios.post("/dj-rest-auth/token/refresh/");
  //         } catch (err) {
  //           setCurrentUser((prevCurrentUser) => {
  //             if (prevCurrentUser) {
  //               history.push("/signin");
  //             }
  //             return null;
  //           });
  //         }
  //         return axios(err.config);
  //       }
  //       return Promise.reject(err);
  //     }
  //   );
  // }, [history]);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }

        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
