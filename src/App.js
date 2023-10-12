import './App.css';
import Login from './Components/Login';
import Users from './Components/Users';
import Register from './Components/Register';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('token');

    if (token !== null && token !== undefined) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  },[])

  return (
    <Router>
    <div>
      <Switch>
        {isAuthenticated ? (
          <Route
              path="/users"
              render={(props) => (
                <Users {...props} setIsAuthenticated={setIsAuthenticated} />
              )}
            />
        ) : (
          <Route exact path="/login">
            <Login setIsAuthenticated={setIsAuthenticated}/>
          </Route>
        )}
        <Route path="/register" component={Register} />
        <Redirect from="/" to={isAuthenticated ? "/users" : "/login"} />
      </Switch>
    </div>
  </Router>
  
  );
}

export default App;
