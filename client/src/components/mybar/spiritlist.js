import React, { useState, useEffect} from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_BARSTOCK } from '../../utils/queries';
import { Card, CardContent, Typography, List, ListItem, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { REMOVE_SPIRIT } from "../../utils/mutations"

const SpiritList =({
 currentuser,
 refreshList,
 setRefreshList
}) => {
    const [selectedSpirit, setSelectedSpirit] = useState('');
    const [removespirit] = useMutation(REMOVE_SPIRIT);
    const {loading, error, data, refetch} = useQuery(QUERY_BARSTOCK);
    useEffect(() => {
        refetch()
      }, [refreshList]);
    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error occurred</div>;
      }
    
    const barStock = data?.me?.barStock || [];
    console.log(barStock)

    const handleRemove = async (event, spiritId) => {
        console.log(event, spiritId)
        try {
          await removespirit({
            variables: { _id: spiritId },
          });
          refetch();
        } catch (error) {
          console.error(error);
        }
      };

    const spiritsByType = {};
    barStock.forEach((spirit) => {
      const { spiritType } = spirit;
      const firstWord = spiritType.split(' ')[0];
      if (!spiritsByType[firstWord]) {
        spiritsByType[firstWord] = [];
      }
      spiritsByType[firstWord].push(spirit);
    });

    const sortedentries = Object.entries(spiritsByType).sort((a, b) => a[0].localeCompare(b[0]));

    sortedentries.forEach(([spiritType, spirits]) => {
        spirits.sort((a, b) => a.name.localeCompare(b.name));
      });


  return (
    <div>
    {!barStock.length ? (
     <h3>No Spirits Yet</h3>
     ) : (
        <Grid container spacing={2}>
        {sortedentries.map(([spiritType, spirits]) => (
          <Grid item xs={12} md={6} key={spiritType}>
            <Card variant="outlined" sx={{ my: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {spiritType}
                </Typography>
                <List>
                  {spirits.map((spirit) => (
                    <ListItem key={spirit._id}  sx={{ borderBottom: '1px dashed lightgray' }}>
                      <Typography>
                        {spirit.name}{' '}
                        {spirit.spiritType.match(/\((.*?)\)/) && (
                          <span> - {spirit.spiritType.match(/\((.*?)\)/)[0]}</span>
                        )}
                      </Typography>
                      <IconButton size="small" color="error" style={{ marginLeft: 'auto' }}
                      id="spirit-select"
                      value={selectedSpirit}
                      label="Select a spirit"
                      onClick={(event) => handleRemove(event, spirit._id)}>
                        <CloseIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}
    </div>
  );
};

export default SpiritList;
