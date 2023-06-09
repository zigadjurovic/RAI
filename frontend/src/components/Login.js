import { useContext, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import './styles/Login.css'; // Import CSS file for styling

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, setUserContext } = useContext(UserContext);

    async function handleLogin(e) {
        e.preventDefault();
        const res = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            setUserContext(data);
        } else {
            setUsername('');
            setPassword('');
            setError('Invalid username or password');
        }
    }

    if (user) {
        return user.isAdmin ? <Navigate replace to="/" /> : <Navigate replace to="/my-parcels" />;
    }

    return (
        <form onSubmit={handleLogin}>
            <div className="login">
                <div className="form">
                    <p>Welcome</p>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="submit" name="submit" value="Log in" />
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </form>
    );
}

export default Login;
