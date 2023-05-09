import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import {  QUERY_POSSIBLECOCKTAILS } from '../../utils/queries';
import { ADD_FAVOURITE } from '../../utils/mutations';
import { Card, CardContent, Grid, List, ListItem, Typography, Checkbox, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const PossibleCocktailsPage =({
    types,
    filtersArr,
    refreshList,
    setRefreshList 
   }) => {
    const [updateFavourite] = useMutation(ADD_FAVOURITE);
    const { loading, error, data, refetch } = useQuery(QUERY_POSSIBLECOCKTAILS);
    useEffect(() => {
        refetch()
      }, [refreshList]);
    const handleFavouriteToggle = async (cocktailId, isFavourite) => {
        try {
          await updateFavourite({
            variables: {
              cocktailId,
              isFavourite: !isFavourite
            }
          });
          setRefreshList(prevValue => !prevValue);
        } catch (error) {
          console.error(error);
        }
      };
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    const { possiblecocktails } = data;
    let filteredCocktails = possiblecocktails;

  if (filtersArr.length > 0) {
    filteredCocktails = possiblecocktails.filter(cocktail =>{
      var result = cocktail.ingredients.some(r=> filtersArr.indexOf(r) >= 0)
      console.log(cocktail.ingredients, filtersArr, result)
      return result
    }
    );
 }
    const sortedAllCocktails = [...filteredCocktails].sort((a, b) => a.cocktail.localeCompare(b.cocktail));

    return (
      <Grid container spacing={2}>
        {sortedAllCocktails.map((cocktail) => (
          <Grid item xs={12} md={6} key={cocktail._id}>
            <Card variant="outlined" sx={{ my: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    {cocktail.imgLink && (
                      <img src={cocktail.imgLink} alt={cocktail.cocktail} style={{ width: '100%', height: 'auto' }} />
                    )}
                  </Grid>
                  <Grid item xs={9}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h5" component="div">
                        {cocktail.cocktail}
                      </Typography>
                      <Checkbox
                        icon={<FavoriteBorderIcon />}
                        checkedIcon={<FavoriteIcon />}
                        color="primary"
                        checked={cocktail.isFavourite}
                        onChange={() => handleFavouriteToggle(cocktail._id, cocktail.isFavourite)}
                        inputProps={{ 'aria-label': 'favourite checkbox' }}
                        />
                    </div>
                    <Typography>{cocktail.description}</Typography>
                    <List>
                      {cocktail.recipe.split(",,").map((item, index) => (
                        <ListItem key={index} sx={{ borderBottom: '1px dashed lightgray' }}>
                          <Typography>{item}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
}

export default PossibleCocktailsPage;