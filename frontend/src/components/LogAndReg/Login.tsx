import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { Input } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data: Record<string, any>) => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/login', data);
      navigation.navigate('Main');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message ?? 'An unexpected error occurred';
        setError(message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };
  
  return (
    <View>
      <Text>Login</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            id="email"
          />
        )}
        name="email"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry={true}
            value={value}
            id="password"
          />
        )}
        name="password"
        rules={{ required: true }}
      />
      <Button
        title="Login"
        onPress={handleSubmit(onSubmit)}
      />
      <Text>Don't have an account? Click here:</Text>
      <Button title="Register" onPress={() => navigation.navigate('Registration')} />
      <Text>{error}</Text>
    </View>
  );
  
};

export default Login;

