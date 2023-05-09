import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Homepage from './components/homepage/Homepage';
import Mybar from './components/mybar/Mybar';
import CocktailSearch from './components/cocktails/CocktailSearch';
import Favourites from './components/favourites/Favourites';
import Profile from './components/Profile/Profile';

const httpLink = createHttpLink({
  //uri: 'http://localhost:3001/graphql',
  uri: '/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Nav/>
        <Routes>
          <Route 
            path='/login' 
            element={<Login />} 
          />
          <Route 
            path='/signup' 
            element={<Signup />} 
          />
          <Route 
            path='/' 
            element={<Homepage />} 
          />
          <Route 
            path='/mybar' 
            element={<Mybar />} 
          />
          <Route 
            path='/cocktails' 
            element={<CocktailSearch />} 
          />
          <Route 
            path='/favourites' 
            element={<Favourites />} 
          />
          <Route 
            path='/profile' 
            element={<Profile />} 
          />
        </Routes>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
