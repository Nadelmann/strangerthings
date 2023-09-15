import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav>
      <div id="navbar">
        <h2>Stranger Things</h2>
        <Link to="/">Home</Link>{"    "}
        <Link to="/allposts">Posts</Link>{"    "}
        <Link to="/userlogin">Login</Link>{"    "}
        <Link to="/newuserform">Register</Link>{"    "}
      </div>
    </nav>
  );
}
