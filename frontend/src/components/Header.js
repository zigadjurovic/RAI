import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";
import "./styles/Header.css"; // Import CSS file for styling

function Header(props) {
    const { user } = useContext(UserContext); // Use useContext hook to access user context

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo-link">
                    <img src="/logo.png" alt="Logo" className="logo-img" /> {/* logo */}
                    <h1 className="logo-text">{props.title}</h1>
                </Link>
                <nav className="menu">
                    <ul className="menu-items">
                        <li className="menu-item">
                            <Link to="/">Home</Link>
                        </li>
                        {user ? (
                            <>
                                <li className="menu-item">
                                    <Link to="/addParcelLocker">Dodaj paketnik</Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/logout">Logout</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="menu-item">
                                    <Link to="/login">Login</Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;