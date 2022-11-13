import { Box, Button, Input, TextField,  } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
function Login({ updateUser }) {
    const [obj, setObj] = useState({})
    const [err, setErr] = useState('')
    const [allUsers, setAllUsers] = useState()
    const [showPassword, setShowPassword] = useState(false)
    let nav = useNavigate()

    const changeInput = e => {
        const { name, value } = e.target
        const newObj = { ...obj, [name]: value }
        setObj(newObj)
        console.log(obj);
    }




    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => setAllUsers(data))

            localStorage.clear('user')
    }, [])

    const enter = () => {
        const { name, password } = obj
        if (allUsers) {

            const user = allUsers.find(user => user.username == name)
            console.log(user);
            if (user) {
                if (password == user.address.geo.lat.slice(-4)) {
                    localStorage.setItem('user', JSON.stringify(user))
                    updateUser(user)
                    setErr('')
                    nav('/home')
                } else {
                    setErr('password error')
                }
            } else {
                setErr('user error')
            }

        } else {
            setErr('network error')
        }
        console.log(obj)
    }

    return (
        
        <div style={{
            border: '1px solid skyblue',
            margin: '80px auto',
            width: '350px',
            borderRadius: '10%',
            padding: '6%',
            // boxSizing: "border-box"
        }}>
            <h1 style={{color:'skyblue'}}>Login page</h1>
            
            {/* <Item  elevation={24}>
                  
                </Item> */}
            <div style={{ width: '350px', display: 'block' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: '5px auto' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        id="input-with-sx"
                        label="user name"
                        variant="standard"
                        value={obj.name}
                        name='name'
                        onChange={changeInput} />
                </Box>
            </div>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField style={{ padding: '0px' }}
                    id="input-with-sx"
                    label="password"
                    variant="standard"
                    value={obj.password}
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    onChange={changeInput} />

            </Box>


            <br />

            <Button onClick={() => enter()}>Login</Button>
            <h6>{err}</h6>
        </div>
    );
}
export default Login;
