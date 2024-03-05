import { View, Button, Text } from 'react-native'
import { Input } from 'react-native-elements'
import React from 'react'

const PatientForm = () => {
    return (
        <View>
            <Text>PatientForm</Text>
            <Input placeholder="Name" />
            <Input placeholder="Age" />
            <Input placeholder="Species" />
            <Input placeholder="Breed" />
            <Input placeholder="Gender" />
            <Button title="Submit" />
        </View>
    )
}

export default PatientForm