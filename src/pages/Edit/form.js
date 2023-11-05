import React, { useState } from "react";

const Form = (props) => {
  const fileId = props.fileId;
  const [email, setEmail] = useState('');

  const handleAddDoctor = async () => {
    try {
      const token = localStorage.getItem('token'); // Replace with your authentication token
      const response = await fetch('http://localhost:5000/sharedoc', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileId, email }),
      });

      if (response.status === 200) {
        alert('Doctor added successfully');
        window.location.reload();
        // You can add further logic to refresh the list of doctors or navigate to another page.
      } else {
        alert('Failed to add doctor. Doctor may not exist.');
      }
    } catch (error) {
      console.error(error);
      alert('Internal server error');
    }
  };

  return (
    <div className="search-container">
      <i className="fa fa-plus-circle"></i>
      <input
        type="email"
        name="email"
        id="search_text"
        className="form-control"
        placeholder="Search for the doctor to add"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="hover-button" onClick={handleAddDoctor}>Add</button>
    </div>
  );
}

export default Form;
