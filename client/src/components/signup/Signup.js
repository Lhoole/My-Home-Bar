import React, { useState } from "react";
import Auth from '../../utils/auth';
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import { useNavigate } from 'react-router-dom';

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
        <div>
            <input type="text" name="firstname" placeholder="First Name" value={formState.firstname} onChange={handleChange}/>
            <input type="text" name="email" placeholder="Email" value={formState.email} onChange={handleChange}/>
            <input type="password" name="password" placeholder="Password" value={formState.password} onChange={handleChange}/>
            <button onClick={handleSignup}>Submit</button>
        </div>
    )
}
export default Signup;