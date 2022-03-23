import logo from './logo.svg';
import './App.css';
import Home from './home';
import Search from './search';
import { BrowserRouter, Link, Switch,Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
    
<BrowserRouter>
<Switch>
<Route path="/" exact>
    <Home />
    </Route>
    <Route path="/search" exact>
    <Search />
    </Route>
</Switch>
</BrowserRouter>




    </div>
  );
}

export default App;
