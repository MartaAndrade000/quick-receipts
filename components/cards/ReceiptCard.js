import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const Card = ({storeName, purchaseValue, location, expirationDate, category, image}) => {

    const navigation = useNavigation();
    const handleCardPress = () => {
        navigation.navigate('Receipt');
    };

    return (
        <TouchableOpacity onPress={handleCardPress} style={styles.cardContainer}>
            <View style={styles.leftSection}>
                <Text style={styles.storeName}>{storeName}</Text>
                <Text style={styles.text}>{purchaseValue}</Text>
                <Text style={styles.text}>{location}</Text>
                <Text style={styles.text}>{expirationDate}</Text>
                <Text style={styles.text}>{category}</Text>
            </View>
            <View style={styles.rightSection}>
                <Image source={image} style={styles.image}/>
            </View>
        </TouchableOpacity>
    );
};


export const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#F6F7FC',
        borderRadius: 10,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    leftSection: {
        flex: 1,
    },
    rightSection: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    storeName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#9EDCE1',
    },
    purchaseValue: {
        fontSize: 14,
    },
    location: {
        fontSize: 14,
    },
    expirationDate: {
        fontSize: 14,
    },
    category: {
        fontSize: 14,
    },
    text: {
        fontSize: 14,
        lineHeight: 18
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },
});

export default Card;