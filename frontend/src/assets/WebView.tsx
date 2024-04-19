import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const OpenCVWebView = () => {
    const htmlContent = `
    <html>
    <head>

    <script src="http://localhost:8000/opencv.js" type="text/javascript"></script>
            <script type="text/javascript">
            function onOpenCvReady() {
                cv['onRuntimeInitialized']=()=>{
                    console.log('OpenCV Ready');
                    // You can call any OpenCV function after this point
                };
            }
        </script>
    </head>
    <body onload="onOpenCvReady();">
        <canvas id="canvasOutput"></canvas>
    </body>
    </html>
`;


    return (
                // Change the localhost to the IP address when in production.
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
