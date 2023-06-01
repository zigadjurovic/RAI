import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";
import "./styles/Header.css"; // Import CSS file for styling

function Header(props) {
  const { user } = useContext(UserContext); // Use useContext hook to access user context

  return (
    <nav id="navbar">
      <div className="nav-wrapper">
        <div className="logo">
          <Link to="/" className="logo-link">
            <i className="fas fa-chess-knight"></i> {props.title}
          </Link>
        </div>

        <ul id="menu">
          {user ? (
                <>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        {user.isAdmin && <Link to="/addParcelLocker">Add Parcel</Link> }
                    </li>
                    <li>
                        {!user.isAdmin && <Link to="/my-parcels">My Parcels</Link> }
                    </li>
                    <li>
                        {!user.isAdmin && <Link to="/profile">Profile</Link> }
                    </li>
                    <li>
                        {user.isAdmin && <Link to="/profile" className="admin">Admin</Link> }
                    </li>
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </>
            )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
