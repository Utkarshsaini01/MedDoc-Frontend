
import React from 'react';
// import Nav from '../../components/nav';
import Add from '../Add/add';
// import View from '../View/view';
import Log from '../view-access/Log';
import Edit from '../Edit/edit';
import './home.css';

const Home = (props) => {
    const view = props.view;
    return (<div>
        <div>
            <div class="top-menu">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <div class="user-option">
                {/* //eslint-disable-next-line */}
                    <a href="#">User</a>
                </div>
            </div>
            <div class="sidebar">
                <a href="/home" id='dash'>Dashboard</a>
                <a href="/home/add" id='add'>Add Records</a>
                <a href="/home/logout" id='logout'>Logout</a>
            </div>
        </div>

        <div class="content">
            {view === "dash" && <Log />}
            {view === "add" && <Add />}
            {view === "edit" && <Edit />}
        </div>
    </div>);
}

export default Home;