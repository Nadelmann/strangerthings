import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav>
      <div id="navbar">
        <h2>Stranger Things</h2>
        <Link to="/allposts">Posts</Link>{"    "}
        <Link to="/profile">Profile</Link>{"    "}
        <Link to="/login">Login</Link>{"   "}
      </div>
    </nav>
  );
}
