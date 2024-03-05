import { View, Text } from "react-native";
import React from "react";

const ImageCapture = () => {
    return (
        <View>
            <Text>ImageCapture</Text>
        </View>
    );
};

// import React, { useState } from 'react';
// import { View, Image, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const ImageCapture = ({ species }) => {
//   const navigation = useNavigation();
//   const [selectedEye, setSelectedEye] = useState(null);

//   const handleEyeSelect = (eye) => {
//     setSelectedEye(eye);
//     // Navigate to the camera or do other actions
//   };

//   return (
//     <View>
//       <Image
//         source={species === 'dog' ? require('./dog.png') : require('./cat.png')}
//         style={{ width: '100%', height: 300 }}
//       />
//       {/* Overlay touchable areas on the eyes */}
//       <TouchableOpacity
//         style={{ position: 'absolute', top: eyePosition.top, left: eyePosition.left, width: eyeSize, height: eyeSize }}
//         onPress={() => handleEyeSelect('left')}
//       />
//       <TouchableOpacity
//         style={{ position: 'absolute', top: eyePosition.top, right: eyePosition.right, width: eyeSize, height: eyeSize }}
//         onPress={() => handleEyeSelect('right')}
//       />
//       {/* Include your animations here */}
//     </View>
//   );
// };

// export default ImageCapture;

export default ImageCapture;
