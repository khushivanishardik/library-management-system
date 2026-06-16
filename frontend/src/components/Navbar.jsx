import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="navbar">
      <h2>📚 LibraryHub</h2>

      <div className="navbar-user">
        👋 {user?.name}
        {" "}
        (
        {user?.role}
        )
      </div>
    </div>
  );
};

export default Navbar;