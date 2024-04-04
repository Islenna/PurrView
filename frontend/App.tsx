import React from 'react';
import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackScreenProps } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './src/context/AuthContext';
import Login from './src/components/LogAndReg/Login';
import Registration from './src/components/LogAndReg/Registration';
import ImageCapture from './src/components/Capture/ImageCapture';
import Results from './src/components/Results/Results';
import Dashboard from './src/components/Dashboard/Dashboard';
import PatientForm from './src/components/Patient/PatientForm';
import PatientInfo from './src/components/Patient/PatientInfo'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export type RootStackParamList = { //This is an interface for the navigation stack. It is used to define the types of the navigation props.
  Login: undefined;
  Registration: undefined;
  PatientForm: undefined;
  PatientInfo: { petId: string };
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
    <AuthProvider>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Main" component={Dashboard} />
          <Stack.Screen name="PatientForm" component={PatientForm} />
          <Stack.Screen name="DashboardTabs" component={MainTabNavigator} />
          <Stack.Screen name="PatientInfo">
            {(props: { route: RouteProp<ParamListBase, 'PatientInfo'>; navigation: any; }) => (
              <PatientInfo route={props.route as RouteProp<RootStackParamList, 'PatientInfo'>} {...props.route.params as { petId: string | undefined }} />
            )}
          </Stack.Screen>
          <Stack.Screen name="ImageCapture" component={ImageCapture} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Results" component={Results} />
    </Tab.Navigator>
  );
};

export default App;
