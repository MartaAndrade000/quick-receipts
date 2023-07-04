import {Button, StyleSheet, View, Text, TextInput} from "react-native";
import Icon from "react-native-paper/src/components/Icon";
import React, {useState} from 'react';
import TextIn from "../components/inputs/TextInput";

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const SignUp = ({ navigation }) => {

    const [value, setValue] = useState({
        email: '',
        password: '',
        error: ''
    })

    async function signUp() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, value.email, value.password);
            navigation.navigate('Sign In');
        } catch (error) {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text>Signup screen!</Text>
            {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}


            <View style={styles.controls}>

                <TextInput
                    placeholder='Email'
                    containerStyle={styles.control}
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                    leftIcon={<Icon
                        source={require('../assets/icons/pencil1.png')}
                        name='envelope'
                        size={16}
                    />}
                />

                <TextInput
                    placeholder='Password'
                    containerStyle={styles.control}
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                    secureTextEntry={true}
                    leftIcon={<Icon
                        source={require('../assets/icons/pencil1.png')}
                        name='key'
                        size={16}
                    />}
                />

                <Button title="Sign up" buttonStyle={styles.control} onPress={signUp} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },

    controls: {
        flex: 1,
        width: "100%",
    },

    control: {
        marginTop: 10
    },

    error: {
        marginTop: 10,
        padding: 10,
        color: '#fff',
        backgroundColor: '#D54826FF',
    },
    input : {
        width: 300,
    }
});

export default SignUp;