import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "../redux/slides/userSlide";
import { useEffect } from "react";

interface PrivateRouteProps {
  component: React.ComponentType;
  requiredRole: string[];
}

const PrivateRoute = ({
  component: Component,
  requiredRole,
}: PrivateRouteProps) => {
  const user = useSelector((state: { user: UserState }) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.access_token) {
      navigate("/sign-in");
    } else if (!requiredRole.includes(user.role)) {
      navigate("/");
    }
  }, [user, requiredRole, navigate]);

  // Kiểm tra quyền truy cập
  if (!user.access_token) {
    return <Navigate to="/sign-in" />;
  }

  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default PrivateRoute;
