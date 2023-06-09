import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";
import "./styles/Header.css"; // Import CSS file for styling

function Header(props) {
  const { user, setUserContext } = useContext(UserContext);

  const handleLogout = () => {
    // Call the logout API endpoint to log out the user
    // ...
    // Clear user data from local storage
    localStorage.removeItem("user");
    // Clear the user context
    setUserContext(null);
    // Redirect the user to the login page
    window.location.href = "/login";
  };

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
                {user.isAdmin && <Link to="/">Home</Link>}
              </li>
              <li>{user.isAdmin && <Link to="/addParcelLocker">Add Parcel</Link>}</li>
              <li>
                {!user.isAdmin && <Link to="/my-parcels">My Parcels</Link>}
              </li>
              <li>{!user.isAdmin && <Link to="/profile">Profile</Link>}</li>
              <li>
                {user.isAdmin && (
                  <Link to="/profile" className="admin">
                    Admin
                  </Link>
                )}
              </li>
              <li>
                <Link to="/" onClick={handleLogout} className="logout-link">
                  Logout
                </Link>
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
