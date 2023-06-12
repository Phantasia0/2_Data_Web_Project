import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/AuthReducer";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!Boolean(user)) {
      navigate("/");
    }
  }, [user]);

  return <div>Profile</div>;
};

export default Profile;
