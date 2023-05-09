import React, { useState } from "react";
import Auth from '../../utils/auth';
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Box, Card, CardContent } from '@mui/material';


function Login () {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, {error}] = useMutation(LOGIN);
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    async function handleLogin (event){
        try {
          const { data } = await login({
            variables: { ...formState },
          });
    
          Auth.login(data.login.token);
          navigate.push('/')
        } catch (e) {
          console.error(e);
        }

        setFormState({
          email: '',
          password: '',
        });
    }

    return(
      <Card>
      <CardContent>
        <h3>Welcome back, please log in to access your bar.</h3>
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
        <TextField
          required
          name="email" 
          id="outlined-required"
          label="Required"
          defaultValue="Email"
          value={formState.email} 
          onChange={handleChange}
        />
          <TextField
            required
            name="password"
            id="outlined-password-input"
            label="Password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </div>
      </Box>
      </CardContent>
      </Card>
    )
}
export default Login;