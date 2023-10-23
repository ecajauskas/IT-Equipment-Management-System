import { Navigate, Outlet, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import axios from "axios";

const RequireAuth = ({ allowedRoles }) => {
    const cookies = new Cookies();
    var logincookie = cookies.get("jwt_authorization");
    useNavigate();

    if (!logincookie) {
        return <Navigate to="/login" replace />
    } else {
        const decoded = jwt_decode(logincookie);
        axios.defaults.headers.common = {
            'Authorization': 'Bearer ' + logincookie
          };
        return (
            allowedRoles.includes(decoded.authorities[0].authority)
                ? <Outlet />
                : decoded.sub
                    ? <Navigate to="/unauthorized" replace />
                    : null
        );
    }

}

export default RequireAuth;