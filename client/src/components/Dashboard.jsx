import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

function Dashboard() {
    const [suc, setSuc ] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get('http://localhost:3000/dashboard')
        .then(res => {
            if(res.data === "Login success") {
                setSuc("Welcome")
            } else {
                navigate('/login')
            }
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h1>Dashboard</h1>
            <p>{suc}</p>
        </div>
    )
}

export default Dashboard;