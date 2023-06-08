import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import "./styles/ParcelLockers.css";
import ParcelHistory from './ParcelHistory';

const ParcelLockers = () => {
  const [parcels, setParcels] = useState([]);
  const { user } = useContext(UserContext); // Use useContext hook to access user context

  useEffect(() => {
    const fetchParcelLockers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/parcel-lockers/api/parcels');
        setParcels(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchParcelLockers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this parcel locker?')) {
      try {
        await axios.delete(`http://localhost:3001/parcel-lockers/${id}`);
        setParcels((prevParcels) => prevParcels.filter((parcel) => parcel._id !== id));
      } catch (error) {
        console.error('Error deleting parcel locker:', error);
      }
    }
  };

  return (
    <div className="parcel-lockers">
      <h2>Parcel Lockers</h2>
      {parcels.map((parcel) => (
        <div key={parcel._id} className="parcel-locker-card">
          <h3>{parcel.name}</h3>
          <p>Number: {parcel.numberParcelLocker}</p>
          {user && user.isAdmin && <Link to={`/parcel-lockers/${parcel._id}/edit`}>Edit</Link> }
          {user && user.isAdmin && <button onClick={() => handleDelete(parcel._id)}>Delete</button> }
          <Link to={`/parcel-lockers/${parcel.numberParcelLocker}/history`}>See more</Link>
        </div>
      ))}
    </div>
  );
};

export default ParcelLockers;
