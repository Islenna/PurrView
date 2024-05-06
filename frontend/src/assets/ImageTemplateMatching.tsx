import React from 'react';
import OpenCVWebView from './OpenCVWebView';

const ImageTemplateMatching = () => {
    return (
        <OpenCVWebView 
            sourceUri="http://localhost:8000/source.jpg" 
            templateUri="http://localhost:8000/template.jpg" 
        />
    );
};

export default ImageTemplateMatching;
