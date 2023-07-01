import React from 'react';
import { View, Image, StyleSheet, SafeAreaView} from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo.png')} // Replace 'logo.png' with your image file name
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 120,
        height: 120,
    },
};


export default Header;
