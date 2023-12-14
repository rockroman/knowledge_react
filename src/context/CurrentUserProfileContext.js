import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq } from "../api/axiosDefault";

export const CurrentUserProfileContext = createContext();
export const SetCurrentUserProfileContext = createContext();

export const useCurrentUserProfile = () =>
  useContext(CurrentUserProfileContext);
export const useSetCurrentUserProfile = () =>
  useContext(SetCurrentUserProfileContext);

export const CurrentUserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = useCurrentUser();

  const fetchData = async () => {
    try {
      if (currentUser && currentUser.profile_id) {
        const { data } = await axiosReq.get(
          `/profile/${currentUser.profile_id}/`
        );
        setUserProfile(data);
        console.log(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  return (
    <CurrentUserProfileContext.Provider value={userProfile}>
      <SetCurrentUserProfileContext.Provider value={setUserProfile}>
        {children}
      </SetCurrentUserProfileContext.Provider>
    </CurrentUserProfileContext.Provider>
  );
};
