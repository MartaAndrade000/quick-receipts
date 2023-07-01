import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';


import WaveBackground from "../components/WaveBackground";
import Card from '../components/CategoryCard';
import {styles} from './Home';

import Button from '../components/Button';

import Category from "./Category";
import {createStackNavigator} from "@react-navigation/stack";


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

    const navigation = useNavigation();

    const handleAddCategory = () => {
        // logic for deleting the category
    };

    const renderCardItem = ({ item }) => (
        <Card
            categoryName={item.categoryName}
            numberReceipts={item.numberReceipts}
            color={item.color}
        />

    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>
            <WaveBackground />
            <View style={categoriesStyles.buttonContainer}>
                <Button
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
        </View>
    );
};

export const categoriesStyles = StyleSheet.create({

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
