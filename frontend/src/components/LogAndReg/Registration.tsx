import { View, Button, Text } from "react-native";
import { Input } from "react-native-elements";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';


type RegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Registration'>;

const Registration = () => {
  const navigation = useNavigation<RegistrationScreenNavigationProp>();
  const { control, handleSubmit, formState: { errors }, register, getValues } = useForm();

  const onSubmit = async (data: Record<string, any>) => {
    console.log(data);
    console.log('submitting');
    try {
      const response = await axios.post('http://localhost:8000/api/users/register', data);
      navigation.navigate('Main');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message ?? 'An unexpected error occurred';
        console.log(message);
      } else {
        console.log('An unexpected error occurred');
      }
    }
  };


  return (
    <View>
      <Text>Registration</Text>

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
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry={true}
            id="password" 
            value={value}
          />
        )}
        rules={{ required: true }}
      />

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: true,
          validate: value =>
            value === getValues("password") || "Passwords do not match",
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Input
            placeholder="Confirm Password"
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry={true}
            value={value}
            id="confirmPassword"
            errorMessage={error ? error.message : ''}
          />
        )}
      />

      <Button
        title="Register"
        onPress={handleSubmit(onSubmit)}
      />

      <Text>Already have an account? Click here:</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />

    </View>
  );
};

export default Registration;
