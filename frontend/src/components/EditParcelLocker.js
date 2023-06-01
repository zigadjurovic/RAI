import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/AddParcelLocker.css';

function EditParcelLocker() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState(''); // Changed variable name
  const [numberParcelLocker, setNumberParcelLocker] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/parcel-lockers/${id}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setName(data.name);  // Updated
        setNumberParcelLocker(data.numberParcelLocker);  // Kept same
      });
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/parcel-lockers/edit-parcel-locker/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,   // Updated
          numberParcelLocker,
        }),
        credentials: 'include',
      });
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to update parcel locker');
      }
    } catch (error) {
      console.error('Error updating parcel locker:', error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <h2>Edit Parcel Locker</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}  // Updated
          onChange={event => setName(event.target.value)}  // Updated
        />
        <input
          type="text"
          className="form-control"
          placeholder="Number"
          value={numberParcelLocker}
          onChange={event => setNumberParcelLocker(event.target.value)}
        />
        <button onClick={handleUpdate} className="form-control">
          Update
        </button>
      </div>
    </div>
  );
}

export default EditParcelLocker;
