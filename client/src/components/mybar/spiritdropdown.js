import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALLSPIRITS } from '../../utils/queries';
import { ADD_EXISTING_SPIRIT } from "../../utils/mutations"
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const SpiritDropdown =({
    user,
    refreshList,
    setRefreshList 
   }) => {
  const [selectedSpirit, setSelectedSpirit] = useState('');
  const { loading, data} = useQuery(QUERY_ALLSPIRITS);
  const [addexistingspirit] = useMutation(ADD_EXISTING_SPIRIT);
  //const [refreshList, setRefreshList] = useState(false);
  const [domupdate, setdomupdate] = useState([(false)]);
//   useEffect(() => {
//     console.log("dom use effect")
//     if (domupdate) {setdomupdate(false)} else {setdomupdate(true)}
//   }, [refreshList]);
  if (loading) {
    return <div>Loading...</div>;
  }

  const barStock = user.barStock || [];
  const spirits = data?.allspirits?.filter(
    (spirit) => spirit.name && spirit.spiritType && spirit._id && !barStock.find((item) => item._id === spirit._id)
  ) || [];
  const sortedSpirits = spirits.sort((a, b) => a.name.localeCompare(b.name));

  const handleChange = (event) => {
    setSelectedSpirit(event.target.value);
  };

  const handleSubmit = async () => {

    try {
      await addexistingspirit({
        variables: { _id: selectedSpirit },
      });
      console.log("handle refresh")
   // if (refreshList) {setRefreshList(false)} else {setRefreshList(true)}
    setRefreshList(prevValue => !prevValue);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel >Select a spirit</InputLabel>
        <Select
          id="spirit-select"
          value={selectedSpirit}
          label="Select a spirit"
          onChange={handleChange}
        >
          {sortedSpirits.map((spirit) => (
            <MenuItem key={spirit._id} value={spirit._id}>
              {spirit.name} : {spirit.spiritType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleSubmit}>
          Add spirit to you Bar.
        </Button>
    </Box>
  );
}

export default SpiritDropdown;
