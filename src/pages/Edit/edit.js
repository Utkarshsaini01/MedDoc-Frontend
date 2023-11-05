import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from './form';
import './edit.css';

const Edit = () => {
  const { fileId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');

        // Include fileId as a query parameter in the URL
        const apiUrl = `http://localhost:5000/doctoraccess?fileId=${fileId}`;

        // Fetch the list of doctors associated with a specific file
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setDoctors(data);
        } else {
          alert('Failed to retrieve doctors. Please try again later.');
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [fileId]);

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const token = localStorage.getItem('token');

      // Include userId and doctorId in the request body
      const requestBody = JSON.stringify({ fileId, doctorId });

      // Send a DELETE request to your API
      const response = await fetch('http://localhost:5000/deletedoctor', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      if (response.status === 200) {
        // If the record is deleted successfully, you can update the doctors list to reflect the changes.
        // const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorId);
        // setDoctors(updatedDoctors);
        alert('doctor deleted successfully !!');
        window.location.reload();
      } else {
        alert('Failed to delete the doctor. Please try again later.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container" style={{ width: '70%', marginLeft: '20%' }}>
      <Form fileId={fileId} />
      <table>
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : doctors.length > 0 ? (
            doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>
                  <i className="fa fa-trash-o" onClick={() => handleDeleteDoctor(doctor.id)} style={{ cursor: 'pointer' }}></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No doctors are added</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Edit;
