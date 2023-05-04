import React, { useState } from "react";
import Auth from '../../utils/auth';
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import { useNavigate } from 'react-router-dom';

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
        <div>
            <input type="text" name="email" placeholder="Email" value={formState.email} onChange={handleChange}/>
            <input type="password" name="password" placeholder="Password" value={formState.password} onChange={handleChange}/>
            <button onClick={handleLogin}>Submit</button>
        </div>
    )
}
export default Login;