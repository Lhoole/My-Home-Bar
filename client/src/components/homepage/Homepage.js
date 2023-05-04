import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';

function Homepage () {
    return(
        <div>
            {!Auth.loggedIn() && 
            <h1>
                Welcome to My Home Bar, this site was designed to help you chose cocktails
                based only on the spirits you already own. Please <Link to="/login">Login</Link> to view your bar
                and favourite cocktails, or <Link to="/signup">Sign Up</Link> to make an accout.
            </h1>
            }
            {Auth.loggedIn() && 
            <h1>
                Welcome Back
            </h1>
            }
        </div>
    )
}
export default Homepage