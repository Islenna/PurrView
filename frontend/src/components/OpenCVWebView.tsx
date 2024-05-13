import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface OpenCVWebViewProps {
    sourceUri: string;
    templateUri: string;
}

const OpenCVWebView: React.FC<OpenCVWebViewProps> = ({ sourceUri, templateUri }) => {
    const htmlContent = `
        <html>
        <head>
            <script src="http://localhost:8000/opencv.js" type="text/javascript"></script>
            <script>
            cv['onRuntimeInitialized'] = () => {
                console.log('OpenCV is ready');
                // Initialize any further processing here if needed
            };

            function loadImagesAndProcess() {
                const srcImage = new Image();
                const templateImage = new Image();

                srcImage.onload = () => {
                    const srcMat = cv.imread(srcImage);
                    templateImage.onload = () => {
                        const templateMat = cv.imread(templateImage);
                        // Now you have both images loaded and can perform operations
                        console.log('Both images are loaded');
                        // Placeholder for further processing
                    };
                    templateImage.src = "${templateUri}";
                };
                srcImage.src = "${sourceUri}";
            }
            </script>
        </head>
        <body onload="loadImagesAndProcess();">
            <canvas id="canvasOutput"></canvas>
        </body>
        </html>
    `;

    return (
        
        <View style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={{ flex: 1 }}
                
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default OpenCVWebView;
