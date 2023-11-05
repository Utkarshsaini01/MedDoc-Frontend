import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './log.css';

const Log = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = (fileId) => {
    // Send a DELETE request to your server to delete the file
    fetch(`http://localhost:5000/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // If the delete request is successful, update the file list
        //   setFiles((prevFiles) => prevFiles.filter((file) => file.fileId !== fileId));
            alert('File deleted successfully !!');
            window.location.reload();
        } else {
          alert('Failed to delete the file. Please try again later.');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to delete the file. Please try again later.');
      });
  };


  useEffect(() => {
    // Fetch files from the API
    fetch('http://localhost:5000/files', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Replace with your actual authentication token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setFiles(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container" style={{ width: '70%', marginLeft: '20%' }}>
      <h1>
        <b>View and Manage Records</b>
      </h1>
      <p>
        <b>View and manage access to the records you have uploaded, make edits to access permissions as needed</b>
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : files.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>View</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.fileId}>
                <td>
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </td>
                <td>{file.filename}</td>
                <td>
                  <i className="fa fa-trash-o" onClick={() => handleDelete(file.fileId)}
                    style={{ cursor: 'pointer' }} ></i>&nbsp;&nbsp;
                  <Link to={`/edit/${file.fileId}`}>
                    <i className="fa fa-edit"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No files are uploaded</p>
      )}
    </div>
  );
};

export default Log;
