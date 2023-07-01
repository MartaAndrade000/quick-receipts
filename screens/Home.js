import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import WaveBackground from "../components/WaveBackground";
import Card from '../components/ReceiptCard';


const HomeScreen = () => {
    const cardData = [
        {
            id: 1,
            storeName: 'Store A',
            purchaseValue: '$10',
            location: 'Location A',
            expirationDate: '2023-07-15',
            category: 'Category A',
            image: require('../assets/icons/qr-code.png'),
        },
        {
            id: 2,
            storeName: 'Store B',
            purchaseValue: '$20',
            location: 'Location B',
            expirationDate: '2023-07-20',
            category: 'Category B',
            image: require('../assets/icons/qr-code.png'),
        },
        {
            id: 3,
            storeName: 'Store C',
            purchaseValue: '$30',
            location: 'Location C',
            expirationDate: '2023-07-25',
            category: 'Category C',
            image: require('../assets/icons/qr-code.png'),
        },
        {
            id: 4,
            storeName: 'Store D',
            purchaseValue: '$40',
            location: 'Location D',
            expirationDate: '2023-07-30',
            category: 'Category D',
            image: require('../assets/icons/qr-code.png'),
        },
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recently Added</Text>
            <WaveBackground />
            <View style={styles.contentContainer}>
                <FlatList
                    data={cardData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderCardItem}
                />
            </View>
        </View>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F6F7FC',
    },
    contentContainer: {
        flex: 1,
        paddingTop: 30,
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
