import React from 'react';
import Add from '../Add/add';
import View from '../View/view';
// import Log from '../view-access/Log';
import './doctor.css';
const Doctor = (props) => {
    const view = props.view;
    return (
        <div>
            <div class="top-menu">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <div class="user-option">
                    <a href="/user-setting">User</a>
                </div>
            </div>
            <div class="sidebar">
                <a href="/doctor/view" id='view' >View Records</a>
                <a href="/doctor/logout" id='logout'>Logout</a>
            </div>
            <div class="content">
                {view === "add" && <Add />}
                {view === "view" && <View />}
            </div>
        </div>
    );
}

export default Doctor;