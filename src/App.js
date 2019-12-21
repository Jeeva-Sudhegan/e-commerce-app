import React, { useEffect, Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import HomePage from "@pages/homepage/homepage.component";
import ShopPage from "@pages/shop/shop.component";
import Header from "@components/header/header.component";
import SignInAndSignUpPage from "@pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { setCurrentUser } from "@redux/user/user.action"
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// eslint-disable-next-line
function App1(props) {
  const {setCurrentUser} = props;

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
  return (
    <div>
      <Header />
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
  unsubscribe = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribe = auth.onAuthStateChanged(async userAuth => {
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
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={() => currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />) } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
