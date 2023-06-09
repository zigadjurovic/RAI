import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../userContext';
import { Link } from 'react-router-dom';
import './styles/ParcelLockers.css';
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
        <h2 className="title">Parcel Lockers</h2>
        {parcels.map((parcel) => (
            <div key={parcel._id} className="parcel-locker-card">
              <h3>{parcel.name}</h3>
              <p>Number: {parcel.numberParcelLocker}</p>
              {user && user.isAdmin && (
                  <div className="actions">
                    <Link to={`/parcel-lockers/${parcel._id}/edit`} className="edit-link">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(parcel._id)} className="delete-button">
                      Delete
                    </button>
                  </div>
              )}
              <Link to={`/parcel-lockers/${parcel.numberParcelLocker}/history`} className="see-more-link">
                See more
              </Link>
            </div>
        ))}
      </div>
  );
};

export default ParcelLockers;
