import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigator'
import CustomSideBarMenu from './CustomSideBarMenu'
import SettingScreen from '../screens/SettingScreen'
import MyDonationsScreen from '../screens/MyDonationScreen'
import NotificationScreen from '../screens/NotificationScreen'

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {screen: AppTabNavigator},
    MyDonations: {screen: MyDonationsScreen},
    Notification: {screen: NotificationScreen},
    Setting: {
        screen: SettingScreen
    },
},
{
    contentComponent: CustomSideBarMenu
},
{
    initialRouteName: 'Home'
})
