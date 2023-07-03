import React, {useState} from 'react';
import { Switch } from 'react-native-paper';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Picker} from 'react-native';


import WaveBackground from "../components/WaveBackground";
import {styles} from './Home';

import CustomButton from '../components/CustomButton';
import TextIn from "../components/inputs/TextInput";

const ReceiptScreen = () => {
    let [variable, setVariable] = useState(true);


    const handleEditReceipt = () => {
        // logic for editing the category
        setVariable(!variable);
    };

    const handleOpenCamera = () => {
        // logic for deleting the category
    };


    return (
        <View style={{...styles.container, paddingHorizontal: 0}}>
            <Text style={{...styles.title, paddingLeft: 16}}>Receipt</Text>
            <WaveBackground/>
            <ScrollView>
                <View style={{paddingHorizontal: 16, marginTop: 20}}>
                    <View style={receiptStyles.buttonContainer}>
                        <CustomButton
                            imageSource={require('../assets/icons/pencil1.png')}
                            label={(!variable ? "Save" : "Edit") + " Receipt"}
                            onPress={handleEditReceipt}
                        />
                    </View>
                </View>
                <View style={{padding: 16}}>
                    <View>
                        <TextIn label={"Store Name"} disabled={variable}/>
                        <TextIn label={"Total Value"} disabled={variable}/>
                        <TextIn label={"Location"} disabled={variable}/>
                    </View>
                </View>

                <View style={receiptStyles.optionContainer}>
                    <View style={receiptStyles.optionHeader}>
                        <Image source={require("../assets/icons/ringing.png")} style={receiptStyles.icon}></Image>
                        <Text>Notification</Text>
                    </View>
                </View>

                <View style={receiptStyles.optionContainer}>
                    <View style={receiptStyles.optionHeader}>
                        <Image source={require("../assets/icons/categories1.png")} style={receiptStyles.icon}></Image>
                        <Text>Category</Text>
                    </View>
                </View>

                <View style={receiptStyles.optionContainer}>
                    <View style={receiptStyles.optionHeader}>
                        <Image source={require("../assets/icons/camera.png")} style={receiptStyles.icon}></Image>
                        <Text>Image</Text>
                    </View>
                    <View style={receiptStyles.camera}>
                        <CustomButton
                            label="Open Image"
                            onPress={handleOpenCamera}
                        />
                    </View>
                </View>

                <View style={receiptStyles.optionContainer}>
                    <View style={receiptStyles.optionHeader}>
                        <Image source={require("../assets/icons/qr-code.png")} style={receiptStyles.icon}></Image>
                        <Text>QR Code</Text>
                    </View>
                </View>


            </ScrollView>

        </View>

    );
};

const receiptStyles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    optionContainer: {
        paddingLeft: 16,
        justifyContent: "center",
        gap: 5,
        marginBottom: 20,
    },
    optionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    icon: {
        width: 15,
        height: 15,
    },
    camera: {
        width: 100,
    },
    dropDownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#ECECEC',
        borderRadius: 5,
    },
    picker: {
        flex: 1,
        marginRight: 10,
    },
    selectedOption: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default ReceiptScreen;
