import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import WaveBackground from "../components/WaveBackground";
import Card from '../components/cards/ReceiptCard';
import {styles} from './Home';

import CustomButton from '../components/CustomButton';
import {createStackNavigator} from "@react-navigation/stack";
import Receipt from "./Receipt";

const CategoryScreen = () => {
    const cardData = [
        {
            id: 1,
            storeName: 'Store A',
            purchaseValue: '$10',
            location: 'Location A',
            expirationDate: '2023-07-15',
            category: 'Category A',
            image: require('../assets/icons/qr-code.png'),
        }
    ];

    const renderCardItem = ({ item }) => (
        <Card
            storeName={item.storeName}
            purchaseValue={item.purchaseValue}
            location={item.location}
            expirationDate={item.expirationDate}
            category={item.category}
            image={item.image}
        />
    );

    const handleDeleteCategory = () => {
        // logic for deleting the category
    };

    const handleEditCategory = () => {
        // logic for editing the category
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Category Name</Text>
            <WaveBackground />
            <View style={categoryStyles.buttonContainer}>
                <CustomButton
                    imageSource={require('../assets/icons/delete.png')}
                    label="Delete Category"
                    onPress={handleDeleteCategory}
                />
                <CustomButton
                    imageSource={require('../assets/icons/pencil1.png')}
                    label="Edit Category"
                    onPress={handleEditCategory}
                />
            </View>
            <View style={{...styles.contentContainer, marginTop:0}}>
                <FlatList
                    data={cardData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderCardItem}
                />
            </View>
        </View>
    );
};

const Stack = createStackNavigator();

const Main = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Category1" component={CategoryScreen} />
            <Stack.Screen name="Receipt" component={Receipt} />
        </Stack.Navigator>
    )
}

const categoryStyles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 40,
    },
});


export default Main;
