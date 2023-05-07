import React, { useState } from "react";
import Auth from '../../utils/auth';
import { useMutation } from "@apollo/client";
import { ADD_SPIRIT } from "../../utils/mutations";
import { useNavigate } from 'react-router-dom';

function Signup () {
    const [formState, setFormState] = useState({ firstname: '',email: '', password: '' });
    const [addUser, {error}] = useMutation(ADD_SPIRIT);
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
          const { data } = await addSpirit({
            variables: { ...formState },
          });

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