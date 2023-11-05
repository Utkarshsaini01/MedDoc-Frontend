import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/login';
import Signup from './pages/Signup/signup';
import Home from './pages/Home/home';
import Doctor from './pages/Doctor/doctor';
import Setting from './pages/Settings/setting';
import Edit from './pages/Edit/edit';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-setting" element={<Setting />} />

          <Route path="/home" element={<Home view="dash" />} />
          <Route path="/home/add" element={<Home view="add" />} />
          <Route path="/home/view" element={<Home view="view" />} />
          <Route path="/home/logout" element={<Login message="Logged out" />} />
          <Route path="/doctor" element={<Doctor view="view" />} />
          <Route path="/doctor/view" element={<Doctor view="view" />} />
          <Route path="/doctor/dashboard" element={<Doctor view="dash" />} />
          <Route path="/doctor/logout" element={<Login message="Logged out" />} />
          <Route path="/edit/:fileId" element={<Home view="edit" />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
