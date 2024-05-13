import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();
    const role = Array.isArray(auth?.role) ? auth.role : [auth.role];
    return(
        auth?.accessToken && role.some(role=>allowedRoles.includes(role))
            ? <Outlet/>
            : auth?.user
                ? <Navigate to="/login" state={{from: location}} replace/>
                : <Navigate to="/unauthorized" state={{from: location}} replace/>
    );
}

export default RequireAuth;