import React, { useState } from 'react';
import './add.css';

const Add = () => {
    const [docName, setDocName] = useState(''); // To store the document name
    const [file, setFile] = useState(null);

    const clearContent = () => {
        setDocName('');
        setFile(null);
    };

    const handleAdd = () => {
        // Create a FormData object to send the file and document name
        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('filename', docName);

        // Send the FormData to the server using a POST request
        fetch('http://localhost:5000/upload', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the JWT token
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // 
                alert("Document uploaded successfull");
                clearContent();
                // Handle the response from the server as needed
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <div className="content">
                <h1>Add Records</h1>
                <label htmlFor="document-type">Select Document Type:</label>
                <input
                    type="text"
                    name="docname"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                />
                <div className="upload-section">
                    <label htmlFor="file-upload">Click to Upload Records:</label>
                    <input
                        type="file"
                        id="file-upload"
                        name="pdf"
                        onChange={handleFileChange}
                    />
                    <button
                        type="button"
                        className="add-button"
                        onClick={handleAdd}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Add;
