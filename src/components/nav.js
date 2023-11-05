import React from 'react';
const Nav = () => {
    return (
        <div>
            <div class="top-menu">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <div class="user-option">
                    <a href="#">User</a>
                </div>
            </div>
            <div class="sidebar">
                <a href="/home" id='dash'>Dashboard</a>
                <a href="/home/view" id='view' >View Records</a>
                <a href="/home/add" id='add'>Add Records</a>
                <a href="/home/logout" id='logout'>Logout</a>
            </div>
        </div>
    );
}

export default Nav;