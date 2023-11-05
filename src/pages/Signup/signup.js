import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
    gender: "",
    dob: "",
    userType: 'user',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Registration was successful, you can redirect to the login page
        alert("Signup Successful");
        navigate("/login");
      } else {
        // Registration failed, handle the error
        alert("Signup Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="signup-container">
            <h2>Sign Up</h2>
            <form id="signupForm">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="username"
                  placeholder="Enter Name"
                  required
                  value={userData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="signupEmail">Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  id="signupEmail"
                  name="email"
                  placeholder="Enter Email"
                  required
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  className="form-control"
                  id="gender"
                  name="gender"
                  required
                  value={userData.gender}
                  onChange={handleChange}
                >
                  <option>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="dob">DOB</label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  name="dob"
                  placeholder="Enter DOB"
                  required
                  value={userData.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="signupPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="signupPassword"
                  name="password"
                  placeholder="Enter Password"
                  required
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Sign up as:</label>
                <input
                  type="radio"
                  id="user"
                  name="userType"
                  value="user"
                  onChange={handleChange}
                  checked={userData.userType === "user"}
                />
                <label htmlFor="user">User</label>
                <input
                  type="radio"
                  id="doctor"
                  name="userType"
                  value="doctor"
                  onChange={handleChange}
                  checked={userData.userType === "doctor"}
                />
                <label htmlFor="doctor">Doctor</label>
              </div>
             
               <a href="/login">Have an account? Login </a>
              
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
