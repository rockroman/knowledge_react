import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../context/CurrentUserContext";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUserProfile } from "../context/CurrentUserProfileContext";
import { Container } from "react-bootstrap";
import Avatar from "../components/Avatar";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({});
  const currentUser = useCurrentUser();
  const currentUserProfile = useCurrentUserProfile();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // If currentUserProfile is already available and not loading, no need to fetch
        // if (currentUserProfile && !currentUserProfile.loading) {
        //   setProfileData(currentUserProfile);
        //   setLoading(false);
        //   return;
        // }

        // Fetch data if not available or still loading
        const { data } = await axiosReq.get(`/profile/${id}/`);
        setProfileData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    // Call fetchData function
    fetchData();
  }, [currentUserProfile, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const {
    bio,
    created_at,
    email,
    first_name,
    image,
    last_name,
    role,
    updated_on,
    role_selected,
  } = profileData;

  return (
    <Container>
      <div>
        <h1>
          <Avatar src={image} />
          {first_name}
          {/* <p>{currentUser?.profile_id}</p> */}
        </h1>
        {/* <h2>Role:{role}</h2> */}
        <>{role ? <h3>Role: {role}</h3> : <h3>Role: Not set</h3>}</>
      </div>
      <p>{bio}</p>
      <p>{id}</p>
      <p>{email}</p>
      <p>{last_name}</p>
      <div>
        <p className="mb-4">{updated_on}</p>
        {!role_selected ? (
          <Link className="btn-primary px-3 py-2 mt-2" to="/set_role">
            Set Role
          </Link>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
};

export default UserProfile;
