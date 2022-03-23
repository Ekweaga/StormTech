import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from 'home.js';
import Search from 'search.js'

const Router = () => {
  return (
   
   
 <Switch>
    <Route path="/" exact>
    <Home />
    </Route>
    <Route path="/search" exact>
    <Search />
    </Route>
    </Switch>
  )
}

export default Router