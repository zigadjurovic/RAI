import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ParcelLockers = () => {
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/parcel-lockers')
      .then(response => {
        setParcels(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this parcel locker?')) {
      try {
        await axios.delete(`http://localhost:3001/parcel-lockers/${id}`);
        setParcels(prevParcels => prevParcels.filter(parcel => parcel._id !== id));
      } catch (error) {
        console.error('Error deleting parcel locker:', error);
      }
    }
  };

  return (
    <div>
      <h2>Parcel Lockers</h2>
      {parcels.map(parcel => (
        <div key={parcel._id}>
          <h3>{parcel.name}</h3>
          <p>Number: {parcel.numberParcelLocker}</p>
          <Link to={`/parcel-lockers/${parcel._id}`}>Select</Link>
          <Link to={`/parcel-lockers/${parcel._id}/edit`}>Edit</Link>
          <button onClick={() => handleDelete(parcel._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ParcelLockers;