import React from 'react';
import OpenCVWebView from '../components/OpenCVWebView';
type ImageTemplateMatchingProps = {
    species: string;
    eye: string;
    sourceUri: string; // Ensure this is included
};

const ImageTemplateMatching: React.FC<ImageTemplateMatchingProps> = ({ species, eye, sourceUri }) => {
    const getTemplateUri = () => {
        return `http://localhost:8000/${species}_${eye}_eye.jpg`;
    };

    return (
        <OpenCVWebView 
            sourceUri={sourceUri} 
            templateUri={getTemplateUri()} 
        />
    );
};

export default ImageTemplateMatching;
