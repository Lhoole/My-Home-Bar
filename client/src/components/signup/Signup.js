import React, { useState } from "react";
import Auth from '../../utils/auth';
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Box, Card, CardContent } from '@mui/material';


function Signup () {
    const [formState, setFormState] = useState({ firstname: '',email: '', password: '' });
    const [addUser, {error}] = useMutation(ADD_USER);
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    async function handleSignup (event){
        try {
          const { data } = await addUser({
            variables: { ...formState },
          });
    
          Auth.login(data.addUser.token);
          navigate.push('/')
        } catch (e) {
          console.error(e);
        }

        setFormState({
          firstname: '',
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
          name="firstname" 
          variant="outlined"
          id="outlined-required"
          label="First Name"
          defaultValue="First Name"
          value={formState.firstname} 
          onChange={handleChange}
        />
        <TextField
          required
          variant="outlined"
          name="email" 
          id="outlined-required"
          label="Email"
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
          <Button variant="contained" onClick={handleSignup}>
          Sign up!
        </Button>
      </div>
      </Box>
      </CardContent>
      </Card>
    )
}
export default Signup;