import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/ParcelHistory.css';

const ParcelHistory = () => {
  const [history, setHistory] = useState([]);
  const { numberParcelLocker } = useParams(); // Retrieve the numberParcelLocker from URL parameters

  useEffect(() => {
    const fetchParcelHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/histories/numberParcelLocker/${numberParcelLocker}`);
        setHistory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchParcelHistory();
  }, [numberParcelLocker]);

  return (
      <div className="parcel-history">
        <h3 className="title">History for Parcel: {numberParcelLocker}</h3>
        <ul className="history-list">
          {history.map((item) => (
              <li key={item._id} className="history-item">
                <p className="date">Date: {item.date}</p>
                <p className={`open ${item.open ? 'success' : 'failure'}`}>Open: {item.open ? 'Yes' : 'No'}</p>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default ParcelHistory;
