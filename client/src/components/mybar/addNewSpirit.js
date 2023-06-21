import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_SPIRIT } from "../../utils/mutations";
import { useNavigate } from 'react-router-dom';
import { Grid, InputLabel, MenuItem, FormControl, Select, NativeSelect, TextField, Button } from '@mui/material';
import SpiritTypes from "../../utils/spiritTypes"
const spiritTypes = SpiritTypes.SpiritTypes

const AddSpirit = ({ 
  user, 
  refreshList,
  setRefreshList 
}) => {
    const [formState, setFormState] = useState({ name: '',spiritType: ''});
    const [addSpirit, {error, data}] = useMutation(ADD_SPIRIT);
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    async function handleAddSpirit (event){
        try {
          const { name, spiritType } = formState;

        const formattedName = name
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        const { data } = await addSpirit({
          variables: {
            name: formattedName,
            spiritType,
          },
        });
        setRefreshList(prevValue => !prevValue);
        } catch (e) {
          console.error(e);
        }

        setFormState({
          name: '',
          spiritType: '',
        });
    }

    return (
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <TextField sx={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}
          label="Spirit name"
          variant="outlined"
          name="name"
          value={formState.name}
          onChange={handleChange}
          fullWidth
        />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth sx={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
            <InputLabel>Spirit Type</InputLabel>
            <Select
              name="spiritType"
              value={formState.spiritType}
              onChange={handleChange}
            >
              {spiritTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
        <Button variant="contained" onClick={handleAddSpirit}>
          Add spirit to you Bar.
        </Button>
      </Grid>
      </Grid>
    );
  }
export default AddSpirit;