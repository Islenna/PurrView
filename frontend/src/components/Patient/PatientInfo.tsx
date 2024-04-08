import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pet } from '../Shared/Pet';

type RootStackParamList = {
    PatientInfo: { petId: string }; // Define the params for the PatientInfo screen
    ImageCapture: { pet: Pet | null }; // Define the params for the ImageCapture screen
    // Add other screens here...
};

type PatientInfoNavigationProp = StackNavigationProp<RootStackParamList, 'PatientInfo'>;

type PatientInfoRouteProp = RouteProp<RootStackParamList, 'PatientInfo'>;

type Props = {
    route: PatientInfoRouteProp;
};


const PatientInfo: React.FC<Props> = ({ route }) => {
    const { petId } = route.params;
    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const { token } = useAuth();
    const navigation = useNavigation<PatientInfoNavigationProp>();
    
    const handleCapture = () => {
        navigation.navigate('ImageCapture', { pet: pet });
    };

    useEffect(() => {
        const fetchPetInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/pets/${petId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPet(response.data);  // Update the pet state with the response data
                setLoading(false); // Set loading state to false after data is fetched
            } catch (error) {
                console.error('Error fetching pet info:', error);
            }
        };

        fetchPetInfo(); // Call the fetchPetInfo function
    }, [petId, token]);

    return (
        <View>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <Text>Patient Information</Text>
                    <Text>Name: {pet ? pet.name : 'Loading...'}</Text>
                    <Text>Pet ID: {petId}</Text>
                </>
            )}
            <Button title="Capture an Image" onPress={handleCapture} />
        </View>
    );
};

export default PatientInfo;
