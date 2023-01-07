import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { LoggedIn } from "./src/screens/login/LoggedIn";
import { LoadingIndicator } from "./src/screens/login/components/interface/LoadingIndicator";
import { firebase } from "@react-native-firebase/auth";
import { LoggedOut } from "./src/screens/logout/LoggedOut";

/*Code-snapped from https://medium.com/@chrisbianca/getting-started-with-firebase-authentication-on-react-native-a1ed3d2d6d91 */

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null
   * (logged out) or an Object (logged in)
   */
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }
  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
  componentWillUnmount() {
    this.authSubscription();
  }
  render() {
    // The application is initialising
    if (this.state.loading) return <LoadingIndicator />; // The user exists, so they're logged in
    if (this.state.user) return <LoggedIn />; // The user is null, so they're logged out
    return <LoggedOut />;
  }
}
