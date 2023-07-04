import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import WaveBackground from "../components/WaveBackground";
import Card from '../components/cards/ReceiptCard';
import Receipt from "./Receipt";
import {createStackNavigator} from "@react-navigation/stack";
import {getAuth} from "firebase/auth";
import db from "../firebase/firebaseConfig";
import {collection, getDocs, onSnapshot, query, where} from "firebase/firestore";


const HomeScreen = () => {
    const [cardData, setCardData] = useState([]);

    // Get the authenticated user's ID
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid;

    const fetchCards = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            const userId = user.uid;

            const cardsRef = collection(db, 'receipts');

            // Subscribe to the 'receipts' collection for real-time updates
            const unsubscribe = onSnapshot(query(cardsRef, where('userId', '==', userId)), (querySnapshot) => {
                const fetchedCardData = [];

                querySnapshot.forEach((doc) => {
                    const card = doc.data();
                    fetchedCardData.push({
                        id: doc.id,
                        storeName: card.storeName,
                        purchaseValue: card.totalValue,
                        location: card.location,
                        expirationDate: card.expirationDate,
                        category: card.category,
                        image: require('../assets/icons/qr-code.png'), // Assuming you want to use a default image
                    });
                });

                setCardData(fetchedCardData);
            });

            // Return the unsubscribe function to detach the listener when needed
            return unsubscribe;
        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    };


    useEffect(() => {
        // Fetch the cards for the authenticated user
        const fetchCards1 = async () => {
            try {
                // Get the authenticated user's ID
                const auth = getAuth();
                const user = auth.currentUser;
                const userId = user.uid;

                // Create a reference to the 'receipts' collection in your database
                const cardsRef = collection(db, 'receipts');

                // Fetch the cards for the authenticated user
                const querySnapshot = await getDocs(query(cardsRef, where('userId', '==', userId)));

                // Initialize an empty array to store the fetched card data
                const fetchedCardData = [];

                // Loop through the query snapshot and extract the card data
                querySnapshot.forEach((doc) => {
                    const card = doc.data();
                    fetchedCardData.push({
                        id: doc.id,
                        storeName: card.storeName,
                        purchaseValue: card.totalValue,
                        location: card.location,
                        expirationDate: card.expirationDate,
                        category: card.category,
                        image: require('../assets/icons/qr-code.png'), // Assuming you want to use a default image
                    });
                });

                // Update the card data in the state
                setCardData(fetchedCardData);
            } catch (error) {
                console.error('Error fetching card data:', error);
            }
        };
        fetchCards();
    }, []);


    const cardDataOld = [
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

    const renderCardItem = ({item}) => (
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
            <WaveBackground/>
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

const Stack = createStackNavigator();

const Main = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Receipt" component={Receipt} />
        </Stack.Navigator>
    )
}

export default Main;
