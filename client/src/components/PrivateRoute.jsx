import { Outlet, Navigate } from "react-router-dom"

export default function PrivateRoute() {
    const storedUser = localStorage.getItem('user');
    return storedUser ? <Outlet /> : <Navigate to='/' />
} 