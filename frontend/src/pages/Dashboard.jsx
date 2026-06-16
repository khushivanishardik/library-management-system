import useAuth from "../hooks/useAuth";

import ManagerDashboard from "./ManagerDashboard";
import StudentDashboard from "./StudentDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (user?.role === "manager") {
    return <ManagerDashboard />;
  }

  return <StudentDashboard />;
};

export default Dashboard;