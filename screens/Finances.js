import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import WaveBackground from "../components/WaveBackground";
import ReceiptCard from '../components/ReceiptCard';
import CategoryCard from '../components/CategoryCard';

import {styles} from './Home';


import {categoriesStyles} from "./Categories";
import Button from "../components/Button";


const FinancesScreen = () => {
    const receiptData = [
        {
            id: 1, storeName: 'Store A',
            purchaseValue: '$10', location: 'Location A',
            expirationDate: '2023-07-15', category: 'Category A',
            image: require('../assets/icons/qr-code.png'),
        },
        {
            id: 2, storeName: 'Store B',
            purchaseValue: '$20', location: 'Location B',
            expirationDate: '2023-07-20', category: 'Category B',
            image: require('../assets/icons/qr-code.png'),
        },

    ];

    const cardData = [
        {id: 1, categoryName: 'Clothes', numberReceipts: '10', color: '#E3D0FF'},
        {id: 2, categoryName: 'Food', numberReceipts: '5', color: '#FFD8B5'},
        {id: 3, categoryName: 'Home', numberReceipts: '8', color: '#FFD3D9'},
        {id: 4, categoryName: 'Car', numberReceipts: '20', color: '#FFF3B0'},
        {id: 5, categoryName: 'NightOut', numberReceipts: '10', color: '#EFE4CB'},
        {id: 6, categoryName: 'Cinema', numberReceipts: '5', color: '#A4E8C2'},
        {id: 7, categoryName: 'Meds', numberReceipts: '8', color: '#C2DFFF'},
        {id: 8, categoryName: 'Gifts', numberReceipts: '10', color: '#E9D8FF'},
    ];

    const renderCardItemReceipt = ({item}) => (
        <ReceiptCard
            storeName={item.storeName}
            purchaseValue={item.purchaseValue}
            location={item.location}
            expirationDate={item.expirationDate}
            category={item.category}
            image={item.image}
        />
    );

    const renderCardItemCategory = ({item}) => (
        <CategoryCard
            categoryName={item.categoryName}
            numberReceipts={item.numberReceipts}
            color={item.color}
        />

    );

    const handleMoreReceipts = () => {
        // logic for deleting the category
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Finances</Text>
            <WaveBackground/>
            <View style={styles.contentContainer}>
                <View style={financesStyles.titleContainer}>
                    <Text>Most Recent Receipt</Text>
                    <View style={{...financesStyles.buttonContainer}}>
                        <Button
                            imageSource={require('../assets/icons/plus.png')}
                            label="Show More"
                            onPress={handleMoreReceipts}
                        />
                    </View>
                </View>

                <FlatList
                    data={receiptData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderCardItemReceipt}
                />
            </View>
            <View style={styles.contentContainer}>
                <View style={financesStyles.titleContainer}>
                    <Text>Your Categories</Text>
                    <View style={{...financesStyles.buttonContainer}}>
                        <Button
                            imageSource={require('../assets/icons/plus.png')}
                            label="Show More"
                            onPress={handleMoreReceipts}
                        />
                    </View>
                </View>
                <FlatList
                    numColumns={2}
                    horizontal={false}
                    //keyExtractor={(item) => item.id.toString()}
                    data={cardData}
                    renderItem={renderCardItemCategory}
                />
            </View>
        </View>
    );
};

const financesStyles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        // marginTop: 40,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 15
    }

});

export default FinancesScreen;
