import React, { useRef, useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Pet } from '../Shared/Pet';
import { Camera } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';

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
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [cameraOpen, setCameraOpen] = useState<boolean>(false);
    const cameraRef = useRef<Camera>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true, flashMode: Camera.Constants.FlashMode };
            const data = await cameraRef.current.takePictureAsync(options);
            console.log(data.uri);
            // Process or save the image as needed
        }
    };



    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleOpenCamera = () => {
        setCameraOpen(true);
    };

    if (cameraOpen) {
        return (
            <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} ref={cameraRef} type={CameraType.back}>
                    {/* Button to take a picture */}
                    <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                        <Text style={styles.captureButtonText}>Take Picture</Text>
                    </TouchableOpacity>
                </Camera>
            </View>
        );
    }


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

            {/* Button to open the camera */}
            {selectedEye && (
                <TouchableOpacity style={styles.cameraButton} onPress={handleOpenCamera}>
                    <Text style={styles.cameraButtonText}>Open Camera</Text>
                </TouchableOpacity>
            )}
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
    cameraButton: {
        marginTop: 20,
        backgroundColor: '#007bff', // A nice shade of blue
        borderRadius: 5,
        padding: 10,
    },
    cameraButtonText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
    captureButton: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        alignSelf: 'center',
        margin: 20,
    },
    captureButtonText: {
        fontSize: 14,
        color: '#000',
    }
    
});

export default ImageCapture;
