import React, { useState } from "react";
import { Grid, InputLabel, MenuItem, FormControl, Select, Typography, List, Button, ListItem, IconButton } from '@mui/material';
import SpiritTypes from "../../utils/spiritTypes"
import CloseIcon from '@mui/icons-material/Close';
const spiritTypes = SpiritTypes.SpiritTypes
let filtersArr = []

const AddFilter =({
    types,
   }) => {
    const [formState, setFormState] = useState({ name: '',spiritType: ''});
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
      
      function addFilter(filtertype){
        filtersArr.push(filtertype)
      }
      function removeFilter(event, filter) {
        console.log(event, filter);
        filtersArr = filtersArr.filter((type) => !filter.includes(type));
      }
    async function handleSelectSpirit (event){
        try {
          const { spiritType } = formState;
            addFilter(spiritType);
            
            console.log(filtersArr)
        } catch (e) {
          console.error(e);
        }

        setFormState({
          spiritType: '',
        });
    }
    const filteredSpiritTypes = spiritTypes.filter((type) => !filtersArr.includes(type));
    return (
        <Grid >
            <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <Typography variant="h5" component="div">
            Filter search results
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Spirit Type</InputLabel>
            <Select
              name="spiritType"
              value={formState.spiritType}
              onChange={handleChange}
            >
              {filteredSpiritTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={handleSelectSpirit}>
            Add filter.
          </Button>
        </Grid>
        </Grid>
        <Grid container spacing={2} item xs={12} alignItems="left">
          <List sx={{ display: 'flex', flexDirection: 'row'}}>
            {filtersArr.map((filters) => (
              <ListItem key={filters} sx={{ borderBottom: '1px dashed lightgray', marginRight: '8px' }}>
                <Typography>
                  {filters}
                </Typography>
                <IconButton size="small" color="error" id="spirit-select" value={filters} label="Select a spirit" onClick={(event) => removeFilter(event, filters)}>
                  <CloseIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    );
  }
export default AddFilter;