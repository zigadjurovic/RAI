import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import './styles/Profile.css';

function Profile(){
    const userContext = useContext(UserContext); 
    const [profile, setProfile] = useState({});

    useEffect(function(){
        const getProfile = async function(){
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
        }
        getProfile();
    }, []);

    return (
        <div className="form-container">
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            <div className="form-group">
                <h2>User profile</h2>
                <p className="profile-field">Username: {profile.username}</p>
                <p className="profile-field">Email: {profile.email}</p>
            </div>
        </div>
    );
}

export default Profile;
