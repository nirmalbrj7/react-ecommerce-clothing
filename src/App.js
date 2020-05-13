import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import './App.css';
import { connect }  from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import {selectCurrentUser} from "./redux/user/user.selector";
import {createStructuredSelector} from "reselect";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from './firebase/firebase.utils'






class App extends React.Component{

    unsubsribeFromAuth = null

    componentDidMount() {

        const {setCurrentUser} = this.props;

        this.unsubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            //createUserProfileDocument(user);
            if (userAuth){
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                            id: snapshot.id,
                            ...snapshot.data()
                    });
                });
            }
            setCurrentUser(userAuth)
        })
    }

    componentWillUnmount() {
        this.unsubsribeFromAuth();
    }

    render() {
        return (
            <div>
                <Router>
                    <Header/>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/shop' component={ShopPage} />
                        <Route exact path='/checkout' component={CheckoutPage} />
                        <Route exact path='/signin' render={() => this.props.currentUser  ? (<Redirect to = '/' />) : (<SignInAndSignUp/>)} />

                    </Switch>

                </Router>

            </div>
        );
    }

}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
