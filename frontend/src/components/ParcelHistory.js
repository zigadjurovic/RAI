import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    <div>
      <h3>History for Parcel: {numberParcelLocker}</h3>
      <ul>
        {history.map((item) => (
          <li key={item._id}>
            <p>Date: {item.date}</p>
            <p>Open: {item.open}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParcelHistory;
