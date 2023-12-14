import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUserProfile } from "../context/CurrentUserProfileContext";
import { Container } from "react-bootstrap";
import Avatar from "../components/Avatar";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({});
  const currentUser = useCurrentUser();
  const currentUserProfile = useCurrentUserProfile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser && currentUserProfile) {
      setLoading(false);
    }
  }, [currentUser, currentUserProfile]);

  if (loading) {
    return <p>Loading...</p>;
  }
  const {
    id,
    bio,
    created_at,
    email,
    first_name,
    image,
    last_name,
    role,
    updated_on,
  } = currentUserProfile;
  return (
    <Container>
      <div>
        <h1>
          <Avatar src={image} />
          {currentUser?.username}
          <p>{currentUser?.profile_id}</p>
        </h1>
      </div>
      <p>{bio}</p>
      <p>{id}</p>
      <p>{email}</p>
      <p>{last_name}</p>
      <div>
        <p>{updated_on}</p>
      </div>
    </Container>
  );
};

export default UserProfile;

// fetching the user profile before implementing
// the profile context

// code working if trying to fetch profile
// using profile_id from current user context
// const [loading, setLoading] = useState(true);
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       if (currentUser && currentUser.profile_id) {
//         const { data } = await axiosReq.get(
//           `/profile/${currentUser.profile_id}/`
//         );
//         setProfileData(data);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   if (currentUser) {
//     fetchData();
//   }
// }, [currentUser]);

// if (loading) {
//   return <p>Loading...</p>;
// }

// if (!currentUser || !currentUser.profile_id) {
//   // Handle the case when profile_id is not available
//   return <p>Profile ID not available.</p>;
// }
// const { profile_id, email, username, first_name, last_name } = currentUser;

// fetching user profile when using use params

// const { id } = useParams();

// const fetchData = async () => {
//   try {
//     const { data } = await axiosReq.get(`/profile/${id}/`);
//     // const { data } = await axiosReq.get(`/profile/${profile_id}/`);
//     console.log(data);
//     setProfileData(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   fetchData();
// }, []);
