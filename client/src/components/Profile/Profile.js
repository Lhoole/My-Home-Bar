import React, {useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { CHANGE_PASS, DELETE_ACC } from "../../utils/mutations";
import { Box, Button, Card, CardContent, CardHeader, Typography, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


function Profile () {
    const { firstname: userParam } = useParams();
    const [formState, setFormState] = useState({ password: '', newpassword: '', lastpassword: ""});
    const [showChangePass, setShowChangePass] = useState(false)
    const [showDeleteAcc, setShowDeleteAcc] = useState(false)
    const navigate = useNavigate();
    const [changePass, {error}] = useMutation(CHANGE_PASS);
    const [deleteAcc, {}] = useMutation(DELETE_ACC);
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

    
    const toggleChange = () => {
        setShowChangePass(!showChangePass);
      };
    const toggleDel = () => {
      setShowDeleteAcc(!showDeleteAcc);
    };
    async function handlechangePass (event){
      try {
        const { data } = await changePass({
          variables: { ...formState },
        });
  
        Auth.getToken();
      } catch (e) {
        console.error(e);
      }

      setFormState({
        password: '',
        newpassword: '',
        lastpassword: ''
      });
      
    }
    async function handleDeleteAcc (event){
      try {
        console.log(formState)
        const { data } = await deleteAcc({
          variables: { password : formState.lastpassword },
        });
        console.log(data)
        Auth.logout();
        navigate("/")
      } catch (e) {
        console.error(e);
      }

      setFormState({
        password: '',
        newpassword: '',
        lastpassword: ''
      });
  }

    return(
        <div>
            {Auth.loggedIn() && (
          
        <div>
          <Card>
      <CardContent>
          <h2>Hello {user.firstname}!</h2>
          <h4>Would you like to change your password,</h4>
          <Box mb={2}>
            <Button variant="outlined" onClick={toggleChange}>
              {showChangePass ? "Hide" : "Change Password"}
            </Button>
          </Box>

          {showChangePass && (
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
                name="password" 
                id="outlined-required"
                label="Old Password"
                type="password"
                autoComplete="current-password"
                value={formState.password}
                onChange={handleChange}
              />
              <TextField
                required
                name="newpassword" 
                id="outlined-password-input"
                label="New Password"
                type="password"
                value={formState.newpassword}
                onChange={handleChange}
              />
              <Button
                  size="large"
                  variant="outlined"
                  onClick={handlechangePass}
                  sx={{ flexShrink: 0 }}
                >
                  Change Password
                </Button>
          </div>
          </Box>
          )}
          <h4>or delete your account?</h4>
          <Box mb={2}>
            <Button variant="outlined" onClick={toggleDel}>
              {showDeleteAcc ? "Hide" : "Delete Account"}
            </Button>
          </Box>
          {showDeleteAcc && (
            <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  required
                  name="lastpassword" 
                  id="outlined-password-input"
                  label="Insert password"
                  type="password"
                  value={formState.lastpassword}
                  onChange={handleChange}
                />
                <Button
                  color="error"
                  size="large"
                  variant="outlined"
                  onClick={handleDeleteAcc}
                  startIcon={<DeleteIcon />}
                  sx={{ flexShrink: 0 }}
                >
                  Delete Account
                </Button>
              </Box>
            </div>
          </Box>
          )}
          </CardContent>
          </Card>
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