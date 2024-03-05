import { View, Button, Text } from 'react-native'
import React from 'react'
import ListPets from './ListPets'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App'

const Dashboard = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Main'>>();
    const handleClick = () => {
        navigation.navigate('PatientForm');
    }

    return (
        <View>
            <Text>Dashboard</Text>
            
            <ListPets />

            <Button
            title="New Pet"
            onPress={handleClick}
            />

        </View>
    )
}

export default Dashboard