import React, { useState, useEffect } from 'react';
import { Text, View} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import {createStackNavigator} from "@react-navigation/stack";
import Receipt from "./Receipt";
import AddReceipt from "./AddReceipt";

const QRCodeScannerScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scannedData, setScannedData] = useState('');
    const [showScannedData, setShowScannedData] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleQRCodeScanned = async ({ data }) => {
        const qrData = extractQRData(data);
        navigation.navigate("AddReceipt", { qrData: qrData });
    };

    const extractQRData = (qrString) => {
        const keyValuePairs = qrString.split("*");
        const qrData = {};

        for (const pair of keyValuePairs) {
            const [key, value] = pair.split(":");
            qrData[key] = value;
        }

        return qrData;
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }



    return (
        <View style={{ flex: 1 }}>
            <BarCodeScanner
                style={{ flex: 1 }}
                onBarCodeScanned={handleQRCodeScanned}
            />
        </View>
    );
};


export default QRCodeScannerScreen;
