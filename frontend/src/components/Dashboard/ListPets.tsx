import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { RootStackParamList } from '../../../App'; // Adjust the path as necessary

type ListPetsNavigationProp = StackNavigationProp<RootStackParamList, 'PatientInfo'>;

type Pet = {
    id: string;
    name: string;
};

const ListPets = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const navigation = useNavigation<ListPetsNavigationProp>();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const { userToken, id } = await getUserInfo();
                const response = await axios.get(`http://localhost:8000/api/pets/owner/${id}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                // Update state with the fetched pets
                setPets(response.data);
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };
        // Call the fetchPets function when the component mounts
        fetchPets();
    }, []);

    const getUserInfo = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const id = await AsyncStorage.getItem('userId');
        return { userToken, id };
    };

    const handlePetClick = (pet: Pet) => {
        navigation.navigate('PatientInfo', { petId: pet.id });
    };

    return (
        <View>
            {pets.length > 0 ? (
                <FlatList
                    data={pets}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handlePetClick(item)}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text>No pets found</Text>
            )}
        </View>
    );
};

export default ListPets;
