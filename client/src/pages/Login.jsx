import axios from "axios"
import { useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Button, Label, TextInput } from "flowbite-react";


const Login = ({ setUser }) => {
    const [data, setData] = useState({
        userName: '',
        password: ''
    });

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        setData({ ...data, [event.target.id]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.post("http://localhost:5000/api/login", {
            userName: data.userName,
            password: data.password
        })
        if (res.data.success) {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(JSON.stringify(res.data.user))
            toast.success(res.data.message)
            navigate('/welcome')
        } else {
            toast.error(res.data.message)
        }
    }

    return (
        <>
            <h1 className="m-4">Login Page</h1>
            <form onSubmit={handleSubmit} className="flex max-w-md mx-auto flex-col gap-4 mt-10 md:mt-52">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="userName" value="Your username" />
                    </div>
                    <TextInput onChange={handleInputChange} id="userName" type="text" placeholder="John Doe" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput onChange={handleInputChange} id="password" type="password" placeholder="****" required />
                </div>
                <Button type="submit">Login</Button>
            </form>
        </>
    )
}

export default Login
