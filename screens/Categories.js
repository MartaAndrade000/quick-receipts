import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {Modal, PaperProvider, Portal} from "react-native-paper";


import WaveBackground from "../components/WaveBackground";
import Card from '../components/cards/CategoryCard';
import {styles} from './Home';

import CustomButton from '../components/CustomButton';

import Category from "./Category";

import {Path, Svg} from "react-native-svg";
import TextIn from "../components/inputs/TextInput";
import ColorChooser from "../components/ColorChooser";


const CategoriesScreen = () => {
    const cardData = [
        { id: 1, categoryName: 'Clothes', numberReceipts: '10', color: '#E3D0FF' },
        { id: 2, categoryName: 'Food', numberReceipts: '5', color: '#FFD8B5' },
        { id: 3, categoryName: 'Home', numberReceipts: '8', color: '#FFD3D9'},
        { id: 4, categoryName: 'Car', numberReceipts: '20', color: '#FFF3B0' },
        { id: 5, categoryName: 'NightOut', numberReceipts: '10', color: '#EFE4CB' },
        { id: 6, categoryName: 'Cinema', numberReceipts: '5', color: '#A4E8C2' },
        { id: 7, categoryName: 'Meds', numberReceipts: '8', color: '#C2DFFF'},
        { id: 8, categoryName: 'Gifts', numberReceipts: '10', color: '#E9D8FF' },

        // Add more data as needed
    ];

    const handleAddCategory = () => {
        showModal()
    };

    const handleSubmit = () => {
        // ...
        hideModal();
    };

    const renderCardItem = ({ item }) => (
        <Card
            categoryName={item.categoryName}
            numberReceipts={item.numberReceipts}
            color={item.color}
        />

    );
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [selectedColor, setSelectedColor] = useState('#DAF4EF');


    return (

        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Categories</Text>
                <WaveBackground />
                <View style={categoriesStyles.buttonContainer}>
                    <CustomButton
                        imageSource={require('../assets/icons/plus.png')}
                        label="Add Category"
                        onPress={handleAddCategory}
                    />
                </View>
                <View style={categoriesStyles.contentContainer}>
                    <FlatList
                        numColumns={2}
                        horizontal={false}
                        //keyExtractor={(item) => item.id.toString()}
                        data={cardData}
                        renderItem={renderCardItem}
                    />
                </View>
                <Portal>
                    <Modal
                        visible={visible}
                        onDismiss={hideModal}
                        contentContainerStyle={categoriesStyles.modalContainer}
                    >
                        <View style={categoriesStyles.waves}>
                            <Svg
                                height= "87"
                                width="100%"
                                viewBox="0 0 1440 320"
                            >
                                <Path
                                    fill={selectedColor} // Blue color for the wave
                                    d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,80C672,107,768,149,864,154.7C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                                />
                            </Svg>
                        </View>
                        <View style={categoriesStyles.modalContentContainer}>
                            <Text style={categoriesStyles.title}>Add Category</Text>
                            <TextIn  label={"Category Name"}/>

                            <View style={categoriesStyles.colorChooser}>
                                <View style={categoriesStyles.optionHeader}>
                                    <Image source={require("../assets/icons/ringing.png")} style={categoriesStyles.icon}></Image>
                                    <Text>Color</Text>
                                </View>
                                <ColorChooser onSelectColor={setSelectedColor}/>
                            </View>

                            <View style={categoriesStyles.submitButton}>
                                <TouchableOpacity onPress={handleSubmit} style={categoriesStyles.button}>
                                    <Text style={styles.label}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Modal>
                </Portal>
            </View>
        </PaperProvider>

    );
};

const categoriesStyles = StyleSheet.create({

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 40,
    },
    contentContainer: {
        paddingTop: 30,
        width: '100%',
        height: '85%',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '45%',
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
    colorChooser: {
        flexDirection: "column",
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
    submitButton: {
        width:100,
        height:50,
        alignSelf: "flex-end"
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#DAF4EF",
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 4,
        justifyContent: 'center',

    },


});


const Stack = createStackNavigator();

const Main = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Categories" component={CategoriesScreen} />
            <Stack.Screen name="Category" component={Category} />
        </Stack.Navigator>
    )
}

export default Main;
