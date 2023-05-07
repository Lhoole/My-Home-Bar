import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import {  QUERY_FAVES, } from '../../utils/queries';
import { ADD_FAVOURITE } from '../../utils/mutations';
import { Card, CardContent, Grid, List, ListItem, Typography, Checkbox, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';



const FaveCocktailsPage =({
    user
   }) => {
    const [updateFavourite] = useMutation(ADD_FAVOURITE);
    const { loading, error, data } = useQuery(QUERY_FAVES);
    const handleFavouriteToggle = async (cocktailId, isFavourite) => {
        try {
          await updateFavourite({
            variables: {
              cocktailId,
              isFavourite: !isFavourite
            }
          });
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

    const favecocktails = data.faves || {};
    console.log(favecocktails)
    const sortedAllCocktails = [...favecocktails].sort((a, b) => a.cocktail.localeCompare(b.cocktail));

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

export default FaveCocktailsPage;