import React from 'react'
import { View, Button, Text } from 'react-native'
import { Input } from 'react-native-elements'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';


const PatientForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: Record<string, any>) => {
        try {
            const response = await axios.post('http://localhost:8000/api/patients', data);
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
            <Text>PatientForm</Text>
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
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="ageYear"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        id="ageYear"
                    />
                )}
                name="ageYear"
                rules={{ required: true }}
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="ageMonth"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        id="ageMonth"
                    />
                )}
                name="ageMonth"
                rules={{ required: true }}
            />

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="species"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        id="species"
                    />
                )}
                name="species"
                rules={{ required: true }}
            />
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
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="gender"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        id="gender"
                    />
                )}
                name="gender"
                rules={{ required: true }}
            />
            <Button title="Submit" />
        </View>
    )
}

export default PatientForm