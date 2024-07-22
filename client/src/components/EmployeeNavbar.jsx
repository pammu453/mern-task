import { Button, Navbar } from "flowbite-react";

import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const EmployeeNavbar = ({ setUser }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('user')
        setUser(null)
        navigate('/')
    }

    return (
        <div>
            <Navbar className="flex flex-wrap gap-5 font-bold">
                <Link to="/welcome">Home</Link>
                <Link to="/employee-list">Employee list</Link>
                <div>{user && user.userName}</div>
                <Button onClick={handleLogout}>Logout</Button>
            </Navbar>
            <hr />
        </div>
    )
}

export default EmployeeNavbar
