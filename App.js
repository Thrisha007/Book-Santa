import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppCotainer, createSwitchNavigator} from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen.js';
import AppDrawerNavigator from './components/AppDrawerNavigator.js';

export default function App() {
  return (
    <AppContainer/>
  );
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  Drawer: {screen: AppDrawerNavigator},
})

const appContainer = createAppCotainer(switchNavigator);