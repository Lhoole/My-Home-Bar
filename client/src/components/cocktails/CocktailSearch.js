import React, { useState, useEffect } from "react";
import Auth from '../../utils/auth';
import { Tab, Tabs, Box, Typography, Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import Allcocktails from './allcocktails';
import PossibleCocktailsPage from './possiblecocktails'
import SomeIngredients from './someingredients'
import SpiritTypes from "../../utils/spiritTypes"
import AddFilter from "./filters";


const spiritTypes = SpiritTypes.SpiritTypes    

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

function CocktailSearch () {
    const [value, setValue] = React.useState(0);
    const [refreshList, setRefreshList] = useState(false);
    // const [filterState, newFilterState] = useState(false);
    const [filtersArr, setFiltersArr] = useState([])
    // let filtersArr = []
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      function addFilter(filtertype){
        //filtersArr.push(filtertype)
        setFiltersArr([...filtersArr, filtertype])
      }
      function removeFilter(event, filter) {
        console.log(event, filter);
        var temp = filtersArr.filter((type) => !filter.includes(type));
        setFiltersArr(temp)
        // newFilterState(prevValue => !prevValue);
      }
    return(
      <Card>
      <CardContent>
        <div>
            {Auth.loggedIn() && 
            <div>     
            <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Cocktails you can make" {...a11yProps(0)} />
          <Tab label="Cocktails you have some ingredients for" {...a11yProps(1)} />
          <Tab label="All Cocktails" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AddFilter
        filtersArr = {filtersArr}
        addFilter = {addFilter}
        removeFilter = {removeFilter}
        />
        {filtersArr.map(test => {return test})}
      <PossibleCocktailsPage
      types = {spiritTypes}
      filtersArr = {filtersArr}
      refreshList={refreshList}
      setRefreshList={setRefreshList}
      />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SomeIngredients
        types = {spiritTypes}
        refreshList={refreshList}
      setRefreshList={setRefreshList}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
       <Allcocktails
       types = {spiritTypes}
       refreshList={refreshList}
      setRefreshList={setRefreshList}
       />
      </TabPanel>
    </Box>
            
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
      </CardContent>
      </Card>
    )
}
export default CocktailSearch