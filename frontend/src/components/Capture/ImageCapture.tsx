import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Pet } from '../Shared/Pet';
import { Camera } from 'expo-camera';

// Importing the images
import DogImage from '../../assets/Dog.jpg';
import CatImage from '../../assets/Cat.jpg';

type Props = {
    route: {
        params: {
            pet: Pet;
        };
    };
};

const ImageCapture: React.FC<Props> = ({ route }) => {
    const { pet } = route.params;
    const [selectedEye, setSelectedEye] = useState<string | null>(null);

    const getPetImage = () => {
        switch (pet.species) {
            case 'Dog':
                return DogImage;
            case 'Cat':
                return CatImage;
            default:
                return null; // Default case if for some reason the species is not Dog or Cat
        }
    };

    const topForSpecies = pet.species === 'Dog' ? '25%' : '45%';

    const leftEyeStyle = {
        ...styles.eyeOverlay,
        ...styles.leftEye,
        top: topForSpecies, // Apply the dynamic top value
    };

    const rightEyeStyle = {
        ...styles.eyeOverlay,
        ...styles.rightEye,
        top: topForSpecies, // Apply the dynamic top value
    };

    const selectEye = (eye: 'left' | 'right') => {
        setSelectedEye(eye); // 'left' or 'right'
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{`Prepare to capture an image of your ${pet.species}`}</Text>
            <View style={styles.imageContainer}>
                <Image source={getPetImage()} style={styles.petImage} />
                {/* Apply the dynamic style based on the species */}
                <TouchableOpacity
                    style={[
                        styles.eyeOverlay,
                        styles.leftEye,
                        { top: pet.species === 'Dog' ? '30%' : '45%' } // Directly applying the dynamic style
                    ]}
                    onPress={() => selectEye('left')}
                />
                <TouchableOpacity
                    style={[
                        styles.eyeOverlay,
                        styles.rightEye,
                        { top: pet.species === 'Dog' ? '30%' : '45%' } // Directly applying the dynamic style
                    ]}
                    onPress={() => selectEye('right')}
                />

            </View>
            {selectedEye && <Text style={styles.selectionText}>You selected the {selectedEye} eye.</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        marginBottom: 20,
        fontSize: 18,
    },
    imageContainer: {
        position: 'relative',
    },
    petImage: {
        width: 500, // Adjust as needed for layout
        height: 500, // Adjust as needed to maintain aspect ratio
        resizeMode: 'contain',
    },
    eyeOverlay: {
        position: 'absolute',
        width: 50, // Size of the touchable area
        height: 50, // Size of the touchable area
        backgroundColor: 'rgba(255,255,255,0.2)', // Semi-transparent to visualize the touchable area; set to 'transparent' in production
    },
    leftEye: {
        left: '30%',
    },
    rightEye: {
        right: '30%',
    },
    selectionText: {
        marginTop: 20,
        fontSize: 16,
    },
});

export default ImageCapture;
