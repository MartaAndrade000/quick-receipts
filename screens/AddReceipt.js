import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Picker from 'react-native-picker'

import {Modal, PaperProvider, Portal} from "react-native-paper";
import {Path, Svg} from "react-native-svg";
import TextIn from "../components/inputs/TextInput";
import {useNavigation} from "@react-navigation/native";


const AddReceiptScreen = () => {

    const navigation = useNavigation();
    const handleSubmit = () => {
        navigation.navigate('Home');

    };

    const handle = () => {

    };

    const [selectedValue, setSelectedValue] = useState("java");


    return (
        <PaperProvider>
            <Portal>
                <Modal
                    visible={true}
                    contentContainerStyle={addReceiptStyles.modalContainer}
                >
                    <View style={addReceiptStyles.waves}>
                        <Svg
                            height= "87"
                            width="100%"
                            viewBox="0 0 1440 320"
                        >
                            <Path
                                fill="#DAF4EF"
                                d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,80C672,107,768,149,864,154.7C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                            />
                        </Svg>
                    </View>

                    <View style={addReceiptStyles.modalContentContainer}>
                        <Text style={addReceiptStyles.title}>Add Receipt</Text>
                        <TextIn  label={"Store Name"}/>
                        <TextIn  label={"Total Value"}/>


                        <View style={addReceiptStyles.optionHeader}>
                            <Image source={require("../assets/icons/location.png")} style={addReceiptStyles.icon}></Image>
                            <Text>Location</Text>
                        </View>
                        <View style={addReceiptStyles.buttonContainer}>
                            <TouchableOpacity onPress={handle} style={[addReceiptStyles.button, { height: 30 }]}>
                                <Text style={addReceiptStyles.label}>Choose Location</Text>
                            </TouchableOpacity>
                        </View>



                        <View style={addReceiptStyles.optionHeader}>
                            <Image source={require("../assets/icons/qr-code.png")} style={addReceiptStyles.icon}></Image>
                            <Text>QR Code</Text>
                        </View>
                        <View style={addReceiptStyles.buttonContainer}>
                            <TouchableOpacity onPress={handle} style={[addReceiptStyles.button, { height: 30 }]}>
                                <Text style={addReceiptStyles.label}>Scan QR Code</Text>
                            </TouchableOpacity>
                        </View>



                        <View style={addReceiptStyles.optionHeader}>
                            <Image source={require("../assets/icons/ringing.png")} style={addReceiptStyles.icon}></Image>
                            <Text>Notification</Text>
                        </View>
                        <View style={addReceiptStyles.pikerContainer}>

                        </View>



                        <View style={addReceiptStyles.optionHeader}>
                            <Image source={require("../assets/icons/categories1.png")} style={addReceiptStyles.icon}></Image>
                            <Text>Category</Text>
                        </View>
                        <View><Text>AHAH</Text></View>



                        <View style={addReceiptStyles.optionHeader}>
                            <Image source={require("../assets/icons/camera.png")} style={addReceiptStyles.icon}></Image>
                            <Text>Image</Text>
                        </View>
                        <View style={addReceiptStyles.buttonContainer}>
                            <TouchableOpacity onPress={handle} style={[addReceiptStyles.button, { height: 30 }]}>
                                <Text style={addReceiptStyles.label}>Open Camera</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={addReceiptStyles.submitButton}>
                            <TouchableOpacity onPress={handleSubmit} style={addReceiptStyles.button}>
                                <Text>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>
            </Portal>
        </PaperProvider>

    );
};

const addReceiptStyles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
        justifyContent: "flex-start",
    },
    waves: {
        justifyContent: "flex-start",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        height: 45,
    },
    modalContentContainer: {
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    optionHeader: {
        paddingTop: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    icon: {
        width: 15,
        height: 15,
    },
    buttonContainer: {
        alignSelf: "flex-start",
        width: 150,

    },
    label: {
        fontSize: 11,
    },
    submitButton: {
        width:100,
        alignSelf: "flex-end",
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#DAF4EF",
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },


});

export default AddReceiptScreen;
