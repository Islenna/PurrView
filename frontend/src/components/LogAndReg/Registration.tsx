import { View, Button, Text } from "react-native";
import { Input } from "react-native-elements";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App'

type RegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Registration'>;

const Registration = () => {
  const navigation = useNavigation<RegistrationScreenNavigationProp>();

  const debugClick = () => {
    navigation.navigate('Main');
  };

  return (
    <View>
      <Text>Registration</Text>
      <Input
        placeholder="email" />
      <Input
        placeholder="password" />
      <Input
        placeholder="confirm password" />
      <Button
        title="Register"
      />
      <Button
        title="Debug"
        onPress={debugClick}
      />
    </View>
  );
};

export default Registration;
