import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';

import { useRoute } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import QRCode from 'react-native-qrcode-svg';
import { SelectList } from 'react-native-dropdown-select-list'

import {Path, Svg} from "react-native-svg";
import {Modal, PaperProvider, Portal} from "react-native-paper";

import {getAuth} from "firebase/auth";
import {collection, addDoc, getDocs, query, where} from "firebase/firestore";
import db from "../firebase/firebaseConfig";

import {FontAwesome} from "@expo/vector-icons";
import TextIn from "../components/inputs/TextInput";
import QRCodeScannerScreen from "./TestQR";
import CameraScreen from "./Camera";

const notificationData = [
    {key:'1', value:'13 Days'},
    {key:'2', value:'15 Days'},
    {key:'3', value:'28 Days'},
    {key:'4', value:'30 Days'},
]


const AddReceiptScreen = () => {

    const route = useRoute();
    const [qrData, setQrData] = useState('');
    const [photoUri, setPhotoUri] = useState('');
    const [photoDate, setPhotoDate] = useState('');
    const [storeName, setStoreName] = useState('');
    const [totalValue, setTotalValue] = useState('');
    const [expDate, setExpDate] = useState('');
    const [notification, setNotification] = useState('Unknown');
    const [categoryName, setCategoryName] = useState('');

    // Get the authenticated user's ID
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid;

    const [categoryData, setCategoryData] = useState('');

    useEffect(() => {
        if (route.params) {
            if (route.params.qrData) {
                setQrData(route.params.qrData);
            }

            if (route.params.photoPayload) {
                setPhotoUri(route.params.photoPayload.photoUri);
                setPhotoDate(route.params.photoPayload.date);
            }
        }
    }, [route.params]);


    // Fetch Categories
    useEffect(() => {
        populateCategoryData();
    }, []);



    const populateCategoryData = async () => {
        try {
            const q = query(collection(db, 'categories'), where('userId', '==', userId));
            const querySnapshot = await getDocs(q);


            const data = [];
            querySnapshot.forEach((doc) => {
                const category = doc.data();

                data.push({
                    id: doc.id,
                    value: category.name,
                });
            });
            setCategoryData(data);
        } catch (error) {
            console.log('Error populating category data:', error);
        }
    };
    const populateCategoryDataRefresh = async () => {
        try {
            const q = query(collection(db, 'categories'), where('userId', '==', userId));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    const category = doc.data();
                    data.push({
                        id: doc.id,
                        value: category.name,
                    });
                });
                setCategoryData(data);
            });

            // Save the unsubscribe function to detach the listener when needed
            // e.g., componentWillUnmount
            return unsubscribe;
        } catch (error) {
            console.log('Error populating category data:', error);
        }
    };

    // Submit
    const navigation = useNavigation();
    const handleSubmit = /*useCallback(*/async () => {
        try {
            // Create a new document in the "Receipt" collection
            const docRef = await addDoc(collection(db, 'receipts'), {
                storeName: storeName,
                totalValue: totalValue,
                expirationDate: expDate,
                qrCode: qrData,
                image: photoUri,
                notification: notification,
                userId: userId,
                location: "CascaisShopping",
                category: categoryName,
            });


            // Retrieve the categoryId based on the category

            // Retrieve the categoryId from Firebase based on the categoryName
            const categorySnapshot = await getDocs(query(collection(db, 'categories'), where('name', '==', categoryName)));
            const categoryDoc = categorySnapshot.docs[0];
            const categoryId = categoryDoc.id; // Assuming there is only one category with the given name

            // Store userId and categoryId in the "categoryReceipt" collection
            await addDoc(collection(db, 'categoryReceipts'), {
                receiptId: docRef.id,
                categoryId: categoryId,
            });

            console.log('Category Receipt stored successfully');

            // Navigate to the home screen after successful submission
            navigation.navigate('Home');
            clearFormData();

        } catch (error) {
            console.error('Error storing receipt:', error);
        }
    }/*, [categoryName])*/;

    const clearFormData = () => {
        setQrData('');
        setPhotoUri('');
        setPhotoDate('');
        setStoreName('');
        setTotalValue('');
        setExpDate('');
        setNotification('Unknown');
        setCategoryName('');
    };

    const handleCamera = () => {
        navigation.navigate('Camera');
    };

    const handleStoreNameChange = (text) => {
        setStoreName(text);
    };
    const handleTotalValueChange = (text) => {
        setTotalValue(text);
    };

    const handleDateChange = (text) => {
        setExpDate(text);
    };

    const handleQrScan = () => {
      navigation.navigate("TestQR");
    };

    const handleCategoryChange = (text) => {
        setCategoryName(text);
    }


    return (
        <PaperProvider>

            <Portal>
                <Modal
                    visible={true}
                    contentContainerStyle={addReceiptStyles.modalContainer}
                >
                    <ScrollView>
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
                        <TextIn  label={"Store Name"} value={storeName} onChangeText={handleStoreNameChange}/>
                        <TextIn  label={"Total Value"} value={totalValue} onChangeText={handleTotalValueChange}/>
                        <TextIn  label={"Expiration Date (DD/MM/YY)"} value={expDate} onChangeText={handleDateChange}/>


                        <View style={addReceiptStyles.optionHeader}>
                            <Image source={require("../assets/icons/location.png")} style={addReceiptStyles.icon}></Image>
                            <Text>Location</Text>
                        </View>
                        <View style={addReceiptStyles.buttonContainer}>
                            <TouchableOpacity style={[addReceiptStyles.button, { height: 30 }]}>
                                <Text style={addReceiptStyles.label}>Choose Location</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <View>
                                <View style={addReceiptStyles.optionHeader}>
                                    <Image source={require("../assets/icons/qr-code.png")} style={addReceiptStyles.icon}></Image>
                                    <Text>QR Code</Text>
                                </View>
                                <View style={addReceiptStyles.buttonContainer}>
                                    <TouchableOpacity onPress={handleQrScan} style={[addReceiptStyles.button, { height: 30 }]}>
                                        <Text style={addReceiptStyles.label}>Scan QR Code</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {qrData && (
                                <View style={{ width: 30, height: 30, alignSelf:"center", marginRight:40}}>
                                    <QRCode value={qrData.qrData} size={60} />
                                </View>
                            )}
                        </View>



                        <View style={addReceiptStyles.optionHeader}>
                            <Image source={require("../assets/icons/ringing.png")} style={addReceiptStyles.icon}></Image>
                            <Text>Notification</Text>
                        </View>
                        <View style={addReceiptStyles.listContainer}>
                            <SelectList
                                boxStyles={addReceiptStyles.listSelect}
                                setSelected={(notification) => setNotification(notification)}
                                data={notificationData}
                                save="value"
                                placeholder={"None"}
                                inputStyles={addReceiptStyles.item}
                                arrowicon={<FontAwesome name="chevron-down" size={0} color={'transparent'}/>}
                                search={false}
                                dropdownStyles={{backgroundColor: "#DAF4EF", borderColor:"transparent"}}
                            />
                        </View>



                        <View style={addReceiptStyles.optionHeader}>
                            <Image source={require("../assets/icons/categories1.png")} style={addReceiptStyles.icon}></Image>
                            <Text>Category</Text>
                        </View>
                        <SelectList
                            boxStyles={addReceiptStyles.listSelect}
                            setSelected={(categoryName) => handleCategoryChange(categoryName)}
                            data={categoryData}
                            save="value"
                            placeholder={"None"}
                            inputStyles={addReceiptStyles.item}
                            arrowicon={<FontAwesome name="chevron-down" size={0} color={'transparent'}/>}
                            search={false}
                            dropdownStyles={{backgroundColor: "#DAF4EF", borderColor:"transparent"}}
                        />



                        <View style={addReceiptStyles.optionHeader}>
                            <Image source={require("../assets/icons/camera.png")} style={addReceiptStyles.icon}></Image>
                            <Text>Image</Text>
                        </View>
                        <View style={addReceiptStyles.buttonContainer}>
                            <TouchableOpacity onPress={handleCamera} style={[addReceiptStyles.button, { height: 30 }]}>
                                <Text style={addReceiptStyles.label}>Open Camera</Text>
                            </TouchableOpacity>
                        </View>

                        {photoUri && <Image source={{ uri: photoUri }} style={addReceiptStyles.photo} />}

                        <View style={addReceiptStyles.submitButton}>
                            <TouchableOpacity onPress={handleSubmit} style={addReceiptStyles.button}>
                                <Text>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </ScrollView>
                </Modal>
            </Portal>

        </PaperProvider>

    );
};
const Stack = createStackNavigator();
const Main = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="AddReceipt" component={AddReceiptScreen} />
            <Stack.Screen name="TestQR" component={QRCodeScannerScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
    )
}

const addReceiptStyles = StyleSheet.create({

    photo: {
        height: 300,
        marginVertical: 10,
    },
    listContainer: {
        width: 130,
    },
    listSelect: {
        height: 30,
        width:130,
        justifyContent: "center",
        backgroundColor: "#DAF4EF",
        borderColor:"transparent"

    },
    item: {
        position: "absolute",
        fontSize: 15,
    },
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

export default Main;
