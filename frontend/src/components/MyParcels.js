import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';
import "./styles/ParcelLockers.css";
import ParcelHistory from './ParcelHistory';

const MyParcels = () => {
  const userContext = useContext(UserContext);
  const [parcelLockers, setParcelLockers] = useState([]);

  useEffect(() => {
    const username = userContext.user.username;
    axios
      .get(`http://localhost:3001/parcel-lockers/my-parcel-lockers/${username}`)
      .then(response => {
        setParcelLockers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [userContext.user.username]);

  return (
    <div className="parcel-lockers">
      <h2>My Parcel Lockers</h2>
      {parcelLockers.map(parcelLocker => (
        <div key={parcelLocker._id} className="parcel-locker-card">
          <h3>{parcelLocker.name}</h3>
          <p>Number: {parcelLocker.numberParcelLocker}</p>
          <Link to={`/parcel-lockers/${parcelLocker.numberParcelLocker}/history`}>See more</Link>
          <Link to={`/parcel-lockers/${parcelLocker._id}/edit`}>Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default MyParcels;
