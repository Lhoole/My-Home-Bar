import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';

    

  

function Homepage () {
    const { firstname: userParam } = useParams();
  
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
      variables: { firstname: userParam },
    });
  
    const user = data?.me || data?.user || {};
    return(
        <div>
            {!Auth.loggedIn() && 
            <h1>
                Welcome to My Home Bar, this site was designed to help you chose cocktails
                based only on the spirits you already own. Please <Link style={{color: "blue", textDecoration: 'none' }} to="/login">Login</Link> to view your bar
                and favourite cocktails, or <Link style={{color: "blue", textDecoration: 'none' }} to="/signup">Sign Up</Link> to make an accout.
            </h1>
            }
            {Auth.loggedIn() &&
            <h1>
                Welcome Back {user.firstname}!
            </h1>
            }
        </div>
    )
}
export default Homepage