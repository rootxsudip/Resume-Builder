import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useProfile } from "../context/ProfileContext";
import { useSubscription } from "../context/SubscriptionContext";
import { useEffect } from "react";

const useMountEffect = (handleLogout) => useEffect(handleLogout, [])
const Logout = () => {
  const { setAuth } = useAuth();
  const { setProfile } = useProfile();
  const { setSubscription } = useSubscription();
  const navigate = useNavigate();

  const handleLogout = () => {
//    Update global auth state
    setAuth({})
    setSubscription({})
    setProfile({})
// Redirect to home page after logout
    navigate("/");
  };

  useMountEffect(handleLogout)
  return (
    // <button onClick={handleLogout}>Logout</button>
    <></>
  );
};

export default Logout;
