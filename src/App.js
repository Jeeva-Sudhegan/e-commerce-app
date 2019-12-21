import React, { useState, useEffect, Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "@pages/homepage/homepage.component";
import ShopPage from "@pages/shop/shop.component";
import Header from "@components/header/header.component";
import SignInAndSignUpPage from "@pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// eslint-disable-next-line
function App1() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let unsubscribe = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else
        setCurrentUser(userAuth);
    });
    return () => unsubscribe();
    // below line if for disabling eslint for next line
    // eslint-disable-next-line
  }, []);
  // for testing whether rendering works or not 
  useEffect(() => {
    console.log(currentUser)
  }, [currentUser]);

  return (
    <div>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

// eslint-disable-next-line
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
    this.unsubscribe = function() {};
  }
  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState(
            {
              currentUser: {
                id: snapshot.id,
                ...snapshot.data()
              }
            },
            () => {
              console.log(this.state.currentUser);
            }
          );
        });
      } else
        this.setState({ currentUser: userAuth }, () =>
          console.log(this.state.currentUser)
        );
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <Header currentUser={currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
