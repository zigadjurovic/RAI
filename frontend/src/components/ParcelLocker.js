import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ParcelLocker = ({ id }) => {
  const navigate = useNavigate();
  const [parcelLocker, setParcelLocker] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/parcel-lockers/${id}`)
      .then(response => {
        setParcelLocker(response.data);
      })
      .catch(error => {
        console.error('Error fetching parcel locker:', error);
      });
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit-parcel-locker/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this parcel locker?')) {
      try {
        await axios.delete(`http://localhost:3001/parcel-lockers/${id}`);
        navigate('/parcel-lockers');
      } catch (error) {
        console.error('Error deleting parcel locker:', error);
      }
    }
  };

  if (!parcelLocker) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{parcelLocker.name}</h2>
      <p>Number: {parcelLocker.numberParcelLocker}</p>
      <Link to={`/edit-parcel-locker/${id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ParcelLocker;
