import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      padding: "15px",
      background: "#222",
      display: "flex",
      gap: "20px"
    }}>

      <Link to="/" style={{ color: "white" }}>Home</Link>

      <Link to="/blogs" style={{ color: "white" }}>Blogs</Link>

      <Link to="/login" style={{ color: "white" }}>Login</Link>

      <Link to="/register" style={{ color: "white" }}>Register</Link>

    </nav>
  );
}

export default Navbar;