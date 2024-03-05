import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App'; // Adjust the path as necessary

type ListPetsNavigationProp = StackNavigationProp<RootStackParamList, 'PatientInfo'>;

//Change once the database is functional.
type Pet = {
    id: string;
    name: string;
};

const dummyPets: Pet[] = [
    { id: '1', name: 'Rex' },
    { id: '2', name: 'Fido' },
];

const ListPets = () => {
    const [pets, setPets] = useState<Pet[]>(dummyPets);
    const navigation = useNavigation<ListPetsNavigationProp>();
    
    useEffect(() => {
        // Here you would fetch the pets belonging to the user
        // This example uses dummy data
        setPets(dummyPets);
    }, []);

    //This function is non-functional right now. It is supposed to navigate to the PatientInfo screen, passing the selected pet as a parameter.

    // const handleSelectPet = (pet: Pet) => { 
    //     // Navigate to the PatientInfo screen, passing the selected pet as a parameter
    //     navigation.navigate('PatientInfo', { pet });
    // };

    const handlePetClick = () => {
        navigation.navigate('PatientInfo');
    };

    return (
        <View>
            {pets.length > 0 ? (
                <FlatList
                    data={pets}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handlePetClick}>
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
