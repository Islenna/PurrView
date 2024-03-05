import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/components/LogAndReg/Login';
import Registration from './src/components/LogAndReg/Registration';
import PatientInfo from './src/components/Patient/PatientInfo';
import ImageCapture from './src/components/Capture/ImageCapture';
import Results from './src/components/Results/Results';
import Dashboard from './src/components/Dashboard/Dashboard';
import PatientForm from './src/components/Patient/PatientForm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export type RootStackParamList = { //This is an interface for the navigation stack. It is used to define the types of the navigation props.
  Login: undefined;
  Registration: undefined;
  PatientForm: undefined;
  PatientInfo: undefined;
  Main: undefined;
  DashboardTabs: undefined;
};

export type MainTabParamList = {
  PatientInfo: undefined;
  ImageCapture: undefined;
  Results: undefined;
};


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Main" component={Dashboard} />
        <Stack.Screen name="PatientForm" component={PatientForm} />
        <Stack.Screen name="DashboardTabs" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="PatientInfo" component={PatientInfo} />
      <Tab.Screen name="ImageCapture" component={ImageCapture} />
      <Tab.Screen name="Results" component={Results} />
    </Tab.Navigator>
  );
};

export default App;
