import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';

import HomePage from "./pages/homepage/homepage.component";

const HatsPage = () => (
    <div>
        <h1> Hats Page</h1>
    </div>
)

function App() {
  return (
    <div>
        <Router>
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/hats' component={HatsPage} />
            </Switch>

        </Router>

    </div>
  );
}

export default App;
