import React from "react";
import { View, Button, Text} from "react-native";
import { Input } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App'

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const handleClick = () => {
    navigation.navigate('Registration');
  }

  const debugClick = () => {
    navigation.navigate('Main');
  }

  return (
    <View>
      <Text>Login</Text>
      <Input placeholder="email" />
      <Input placeholder="password" />
      <Text>Need an account? Click here:</Text>
      
      <Button
      title="Log In"
      onPress={debugClick}
      />
      <Button 
        title="Register" 
        onPress={handleClick} 
      />
      <Button
        title="Debug"
        onPress={debugClick}
        />

    </View>
  );
};

export default Login;
