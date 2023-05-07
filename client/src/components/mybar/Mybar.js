import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import SpiritList from './spiritlist';


function Mybar () {
    const { firstname: userParam } = useParams();
  
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
      variables: { firstname: userParam },
    });
    if (loading) {
        return <div>Loading...</div>;
      }
  
    const user = data?.me || {};
    return(
        <div>
            {Auth.loggedIn() &&
            <div>
            <h1>
                Welcome Back {user.firstname}!
            </h1>
            <p>
                The current spirits in your bar are:
            </p>
            <ul>
                <li>
                    test 1 {user.favourites}
                </li>
                <div>
                <SpiritList
                    currentuser={user}
                />
                </div>
                 </ul>
            </div>
                  
            }
            {!Auth.loggedIn() &&
            <div>
            <h4>
                You must be logged in to view this page, please login or signup at the top right corner of this site.
            </h4>
            </div>    
            }
        </div>
    )
}
export default Mybar