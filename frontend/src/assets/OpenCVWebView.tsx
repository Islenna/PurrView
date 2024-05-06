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
            <script type="text/javascript">
                function onOpenCvReady() {
                    cv['onRuntimeInitialized'] = () => {
                        console.log('OpenCV Ready');
                        // Load the source and template images
                        let src = cv.imread('sourceImage');
                        let template = cv.imread('templateImage');
                        let result = new cv.Mat();
                        // Do the matching
                        cv.matchTemplate(src, template, result, cv.TM_CCOEFF);
                        let minMax = cv.minMaxLoc(result);
                        let maxPoint = minMax.maxLoc;
                        let matchLoc = new cv.Point(maxPoint.x + template.cols, maxPoint.y + template.rows);
                        cv.rectangle(src, maxPoint, matchLoc, [0, 255, 0, 255], 2, cv.LINE_8, 0);
                        // Display the result
                        cv.imshow('canvasOutput', src);
                        src.delete(); 
                        template.delete(); 
                        result.delete();
                        console.log('Template matching completed');
                    };
                }
            </script>
        </head>
        <body onload="onOpenCvReady();">
            <img id="sourceImage" src="${sourceUri}" style="display:none;">
            <img id="templateImage" src="${templateUri}" style="display:none;">
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
