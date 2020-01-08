import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import PagePosts from './pages/pagesPosts/pagePost.component';
import PageComments from './pages/pageComments/pageComments.component';

function App() {
  return (
    <Switch>
          <Route 
              exact 
              path="/" 
              component={PagePosts}
            />

            <Route  path='/comments/:id' component={PageComments}
              />
            <Redirect to="/" />

    </Switch>
    
  )
}

export default App;
