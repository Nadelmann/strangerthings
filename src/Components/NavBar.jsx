import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div id="navbar">
        <Link to="/posts">Posts</Link>{"    "}
        <Link to="/profile">Profile</Link>{"    "}
        <Link to="/login"></Link>{"   "}
    </div>
    )
}