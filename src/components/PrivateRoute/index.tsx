
import { Navigate } from "react-router-dom";
//context
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
