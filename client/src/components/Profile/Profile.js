import React, {useState, useEffect} from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import SpiritList from './spiritlist';
import { Box, Button, Typography } from '@mui/material';


function Profile () {
    const { firstname: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
      variables: { firstname: userParam },
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    if (loading) {
        return <div>Loading...</div>;
      }
  
    const user = data?.me || {};

    
    const toggleAdd = () => {
        setShowAddSpirit(!showAddSpirit);
      };

    return(
        <div>
            {Auth.loggedIn() && (
        <div>
          <h1>Welcome Back {user.firstname}!</h1>

          <Box mb={2}>
            <Button variant="outlined" onClick={toggleAdd}>
              {showAddSpirit ? "Change password" : "Hide"}
            </Button>
          </Box>

          {showAddSpirit && (
            <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <Typography variant="h5" component="div">
                Change password.
              </Typography>
            </Grid>
            <Grid item xs={4}>
            <TextField
          label="Old Password"
          variant="outlined"
          name="name"
          value={formState.oldpass}
          onChange={handleChange}
          fullWidth
                />
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" onClick={handleSelectSpirit}>
                Add filter.
              </Button>
            </Grid>
            </div>
          )}

          <Typography variant="body1">
            The current spirits in your bar are:
          </Typography>

          <Box>
            <SpiritList key={refreshList} currentuser={user} refreshList={refreshList} />
          </Box>
        </div>
      ) }
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
export default Profile