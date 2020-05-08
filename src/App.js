import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";



function App() {
  return (
    <div>
        <Router>
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/shops' component={ShopPage} />
            </Switch>

        </Router>

    </div>
  );
}

export default App;
