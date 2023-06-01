import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './styles/AddParcelLocker.css';

function AddParcelLocker() {
  const [numberParcelLocker, setNumberParcelLocker] = useState('');
  const [nameParcelLocker, setNameParcelLocker] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!numberParcelLocker || !nameParcelLocker) {
      alert('Please enter the parcel number and name');
      return;
    }

    const payload = {
      numberParcelLocker,
      nameParcelLocker
    };

    try {
      await axios.post('http://localhost:3001/parcel-lockers', payload);
      setUploaded(true);
    } catch (error) {
      console.error('Error adding parcel locker:', error);
    }
  };

  return (
    <div className="form-container">
      <form className="form-group mx-auto" onSubmit={onSubmit}>
        {uploaded && <Navigate replace to="/" />}
        <div className="mb-3">
        <h2>Add Parcel Locker</h2>
          <input
            type="text"
            className="form-control"
            name="numberParcelLocker"
            placeholder="Parcel Number/ID"
            value={numberParcelLocker}
            onChange={(e) => setNumberParcelLocker(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="nameParcelLocker"
            placeholder="Parcel Name"
            value={nameParcelLocker}
            onChange={(e) => setNameParcelLocker(e.target.value)}
          />
        </div>
        <div className="mb-3 text-center">
          <button className="btn btn-primary" type="submit" name="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddParcelLocker;
