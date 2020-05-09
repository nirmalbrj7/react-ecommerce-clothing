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
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from './firebase/firebase.utils'



class App extends React.Component{
    constructor() {
        super();

        this.state = {
            currentUser: null
        }
    }

    unsubsribeFromAuth = null

    componentDidMount() {
        this.unsubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            //createUserProfileDocument(user);
            if (userAuth){
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    this.setState({
                        currentUser:{
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    });

                });

            }
            this.setState({currentUser : userAuth})
        })
    }

    componentWillUnmount() {
        this.unsubsribeFromAuth();
    }

    render() {
        return (
            <div>
                <Router>
                    <Header currentUser = {this.state.currentUser}/>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/shop' component={ShopPage} />
                        <Route exact path='/signin' component={SignInAndSignUp} />
                    </Switch>

                </Router>

            </div>
        );
    }

}

export default App;
