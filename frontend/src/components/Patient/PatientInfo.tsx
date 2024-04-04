import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';

type RootStackParamList = {
    PatientInfo: { petId: string }; // Define the params for the PatientInfo screen
    // Add other screens here...
};

type PatientInfoRouteProp = RouteProp<RootStackParamList, 'PatientInfo'>;

type Props = {
    route: PatientInfoRouteProp;
};

const PatientInfo: React.FC<Props> = ({ route }) => {
    const { petId } = route.params;

    useEffect(() => {
        const fetchPetInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/pets/${petId}`);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching pet info:', error);
            }
        };
        fetchPetInfo();
    }, [petId]);

    return (
        <View>
            <Text>Patient Information</Text>
            <Text>Pet ID: {petId}</Text>
        </View>
    );
};

export default PatientInfo;