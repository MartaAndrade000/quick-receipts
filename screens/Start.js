import {
    ScrollView,
    StyleSheet,
    View,
    SafeAreaView,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";

import React, {useRef, useState} from "react";
import TextIn from "../components/inputs/TextInput";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";

const auth = getAuth();
const StartScreen = ({navigation}) => {

    const scrollViewRef = useRef();

    const scrollToTop = () => {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    };

    const scrollToBottom = () => {
        const { current } = scrollViewRef;
        current.scrollToEnd({ animated: true });
    };

    const [value, setValue] = useState({
        email: '',
        password: '',
        error: ''
    });

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
            navigation.navigate('Home');
        } catch (error) {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    return (
        <SafeAreaView style={startStyles.container}>
            <ScrollView style={startStyles.scrollView} ref={scrollViewRef}>
                <View style={startStyles.screen1}>
                    <Image style={{...startStyles.loginBackground}}
                           source={require("../assets/images/backgrounds/LoginBackgroud.png")}
                    />

                    <View style={{...startStyles.loginFormContainer, padding: 30}}>
                        <Image style={{width: "100%", height: "100%", resizeMode: 'stretch'}}
                               source={require("../assets/images/backgrounds/LoginContainer.png")}
                        />
                        <View style={startStyles.inputs}>
                            <Image style={startStyles.logo}
                                   source={require("../assets/images/logo.png")}
                            />
                            <TextIn style={startStyles.input} label={"Email"} onChangeText={(text) => setValue({ ...value, email: text })}/>
                            <TextIn style={startStyles.input} label={"Password"} onChangeText={(text) => setValue({ ...value, password: text })}/>
                            <Text style={{paddingTop:30, color: "#808080", fontSize: 10}}>Forgot Password</Text>
                            <TouchableOpacity onPress={signIn} style={startStyles.button}>
                                <Text>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={scrollToBottom} style={startStyles.arrow}>
                                <Image style={{width:20, height:20,  transform: [{ rotate: '-90deg' }, { scaleX: -1 }],}}
                                       source={require("../assets/icons/arrow_right.png")}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <View style={startStyles.screen2}>
                    <Image style={startStyles.loginBackground}
                           source={require("../assets/images/backgrounds/RegisterBackgroud.png")}
                    />

                    <View style={{...startStyles.registerFormContainer, padding: 30}}>
                        <Image style={{width: "100%", height: "100%", resizeMode: 'stretch'}}
                               source={require("../assets/images/backgrounds/RegisterContainer.png")}
                        />
                        <View style={startStyles.inputs}>
                            <TouchableOpacity onPress={scrollToTop} style={startStyles.arrow2}>
                                <Image style={{width:20, height:20,  transform: [{ rotate: '-90deg' }],}}
                                       source={require("../assets/icons/arrow_right.png")}/>
                            </TouchableOpacity>
                            <Image style={startStyles.logo}
                                   source={require("../assets/images/logo.png")}
                            />
                            <TextIn style={startStyles.input} label={"Name"}/>
                            <TextIn style={startStyles.input} label={"Email"} onChangeText={(text) => setValue({ ...value, email: text })}/>
                            <TextIn style={startStyles.input} label={"Password"} onChangeText={(text) => setValue({ ...value, password: text })}/>
                            <TouchableOpacity onPress={signUp} style={startStyles.button}>
                                <Text>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

const startStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
    },
    screen1: {
        alignItems: 'center',
        height: 555,
    },
    loginBackground: {
        width: "100%",
        resizeMode: 'stretch',
        height: 560,
    },
    loginFormContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        paddingBottom: 55,
    },
    inputs: {
        alignSelf: "center",
        position: "absolute",
        width: "90%",
    },
    logo:{
        resizeMode: 'contain',
        width: 150,
        height: 150,
        alignSelf: "center",
    },
    button: {
        marginTop:30,
        alignSelf: "flex-end",
        alignItems: 'center',
        backgroundColor: "#DAF4EF",
        borderRadius: 15,
        paddingHorizontal: 30,
        paddingVertical: 4,
    },
    arrow: {
        marginTop:70,
        alignSelf: "flex-end",
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#DAF4EF",
        borderRadius: 15,
        height:30,
        width:30,
    },
    arrow2: {
        marginTop:70,
        alignSelf: "flex-start",
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#C0E5E8",
        borderRadius: 15,
        height:30,
        width:30,
    },
    screen2: {
        height: 560,
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerFormContainer: {
        paddingTop: 50,
        position: "absolute",
        width: "100%",
        height: "100%",

    }
});



export default StartScreen;