import React, { useState, useEffect } from 'react';
import './view.css';

const View = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch records from the API
    fetch('http://localhost:5000/getdocs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Replace with your actual authentication token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setRecords(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="content" style={{ width: '70%', marginLeft: '20%' }}>
        <h1>View Records</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Owner Name</th>
              <th>Owner Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : records.length > 0 ? (
              records.map((record, index) => (
                <tr key={index}>
                  <td>{record.fileName}</td>
                  <td>{record.userName}</td>
                  <td>{record.userEmail}</td>
                  <td>
                    <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
                      View PDF
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;
