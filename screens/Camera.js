import React, { useState, useRef } from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import moment from 'moment';

const CameraScreen = ({ navigation }) => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef(null);
    const [photo, setPhoto] = useState('');

    if (!permission) {
        return (
            <Text>NOO</Text>
        )
    }

    if (!permission.granted){
        return (
            <Text>NOO</Text>
        )
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function handleTakePhoto() {
        if (cameraRef.current) {
            const options = { quality: 0.5 };
            const data = await cameraRef.current.takePictureAsync(options);
            const { uri, width, height } = data;
            const photoPayload = {
                photoUri: uri,
                date: moment().format('DD-MM-YYYY'), // Format the current date as day-month-year
            };
            setPhoto(uri);
            navigation.navigate('AddReceipt', { photoPayload });
        }
    }


    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                        <Text style={styles.text}>Take Photo</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'white',
    },
    text: {
        color: 'white',
    },
});
export default CameraScreen;
