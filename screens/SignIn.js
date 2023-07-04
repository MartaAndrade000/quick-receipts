import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {View, TextInput, Button, StyleSheet, Text} from "react-native";
import {useState} from "react";

const auth = getAuth();

const SignInScreen = ({ navigation }) => {
    const [value, setValue] = useState({
        email: '',
        password: '',
        error: ''
    })

    async function signIn() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, value.email, value.password);
        } catch (error) {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text>Sign In screen!</Text>

            {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

            <View style={styles.controls}>
                <TextInput
                    placeholder='Email'
                    containerStyle={styles.control}
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                />


                <TextInput
                    placeholder='Password'
                    containerStyle={styles.control}
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                    secureTextEntry={true}
                    />
                <Button title="Sign in" buttonStyle={styles.control} onPress={signIn} />
            </View>
        </View>
    );
}

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
    },

    control: {
        marginTop: 10
    },

    error: {
        marginTop: 10,
        padding: 10,
        color: '#fff',
        backgroundColor: '#D54826FF',
    }
});

export default SignInScreen;