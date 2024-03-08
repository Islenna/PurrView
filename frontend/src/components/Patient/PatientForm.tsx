import React from 'react'
import { View, Button, Text } from 'react-native'
import { Input } from 'react-native-elements'
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';

type PetFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const PatientForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigation = useNavigation<PetFormScreenNavigationProp>();

    const onSubmit = async (data: Record<string, any>) => {
        try {
            // Retrieve user token from AsyncStorage
            const userToken = await AsyncStorage.getItem('userToken');

            // Set Authorization header with the retrieved token
            const response = await axios.post('http://localhost:8000/api/pets/new', data, {
                headers: {
                    Authorization: `Bearer ${userToken}` // Use the userToken variable
                }
            });
            console.log("Created new pet:", response.data);
            navigation.navigate('Main');
        }
        
        catch (err) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message ?? 'An unexpected error occurred';
                console.log(message);
            } else {
                console.log('An unexpected error occurred');
            }
        }
    };


    const speciesOptions = ['Dog', 'Cat']
    const genderOptions = ['Male', 'Female', 'Spayed', 'Neutered', 'Unknown']

    return (
        <View>
            <Text>PatientForm</Text>
            <Text>Name</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        id="name"
                    />
                )}
                name="name"
                rules={{ required: true }}
            />
            <Text>Species</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        onBlur={onBlur}
                        id="species"
                    >
                        {speciesOptions.map((species) => (
                            <Picker.Item label={species} value={species} key={species} />
                        ))}
                    </Picker>
                )}
                name="species"
                rules={{ required: true }}
            />
            <Text>Sex</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        onBlur={onBlur}
                        id="sex"
                    >
                        {genderOptions.map((gender) => (
                            <Picker.Item label={gender} value={gender} key={gender}
                            />
                        ))}
                    </Picker>
                )}
                name="sex"
                rules={{ required: true }}
            />
            <Text>Age in Years</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="age in years (approximate is okay)"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        id="ageYear"
                    />
                )}
                name="ageYear"
                rules={{ required: true }}
            />
            <Text>Age in Months</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="age in months (approximate is okay)"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        id="ageMonth"
                    />
                )}
                name="ageMonth"
                rules={{ required: true }}
            />

            <Text>Breed</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="breed"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        id="breed"
                    />
                )}
                name="breed"
                rules={{ required: true }}
            />

            <Button
                title="Submit"
                onPress={handleSubmit(onSubmit)}
            />

        </View>
    )
}

export default PatientForm