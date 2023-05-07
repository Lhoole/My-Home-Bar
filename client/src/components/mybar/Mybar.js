import React, {useState, useEffect} from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import SpiritList from './spiritlist';
import AddNewSpirit from './addNewSpirit'
import SpiritDropdown from './spiritdropdown'
import { Box, Button, Typography } from '@mui/material';


function Mybar () {
    const { firstname: userParam } = useParams();
    const [refreshList, setRefreshList] = useState([(false)]);
    const [showAddSpirit, setShowAddSpirit] = useState(false)
    const [showAddNew, setShowAddNew] = useState(false)
    const { loading, data, refetch } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
      variables: { firstname: userParam },
    });
    if (loading) {
        return <div>Loading...</div>;
      }
  
    const user = data?.me || {};
    console.log(user)


    const handleNewSubmit = () => {
        setRefreshList(prevValue => !prevValue); 
       refetch();
    };
    
    const toggleAdd = () => {
        setShowAddSpirit(!showAddSpirit);
      };
      const toggleNew = () => {
        setShowAddNew(!showAddNew);
      };

    return(
        <div>
            {Auth.loggedIn() && (
        <div>
          <h1>Welcome Back {user.firstname}!</h1>

          <Box mb={2}>
            <Button variant="outlined" onClick={toggleAdd}>
              {showAddSpirit ? "Hide Inputs" : "Add new spirits"}
            </Button>
          </Box>

          {showAddSpirit && (
            <div>
              <div>
                <SpiritDropdown 
                user={user}
                onSubmit={handleNewSubmit}
                />
            </div>
            <h3>If the spirit you are looking for doesnt yet exist, try adding your own.</h3> 
            <Box mb={2}>
            <Button variant="outlined" onClick={toggleNew}>
              {showAddNew ? "Hide new spirits" : "Add new spirits"}
            </Button>
          </Box>
          {showAddNew && (
            <div>
                <AddNewSpirit 
                user={user}
                onSubmit={handleNewSubmit}
                />
            </div>)}
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
export default Mybar