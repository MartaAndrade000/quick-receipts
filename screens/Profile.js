import React, {useState} from 'react';
import { Switch } from 'react-native-paper';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';


import WaveBackground from "../components/WaveBackground";
import {styles} from './Home';

import CustomButton from '../components/CustomButton';
import TextIn from "../components/inputs/TextInput";

const CategoryScreen = () => {
    let [variable, setVariable] = useState(true);

    const [isNotificationOn, setIsNotificationOn] = React.useState(false);
    const [isModeOn, setIsModeOn] = React.useState(false);

    const onToggleSwitchNotif = () => setIsNotificationOn(!isNotificationOn);
    const onToggleSwitchMode = () => setIsModeOn(!isModeOn);

    const handleEditCategory = () => {
        // logic for editing the category
        setVariable(!variable);
    };

    // {/*style={{...styles.title, paddingHorizontal:16, paddingTop:16, paddingBottom: 16}}*/}
    // {flex: 1, backgroundColor: '#F6F7FC',}
    return (
        <View style={{...styles.container, paddingHorizontal: 0}}>
            <Text style={{...styles.title, paddingLeft: 16}} >Category Name</Text>
            <WaveBackground/>
            <ScrollView>
                <View style={{padding: 16}}>
                    <View style={profileStyles.container}>
                        <View style={profileStyles.imageContainer}>
                            <Image source={require("../assets/images/profile.png")} style={profileStyles.image}/>
                        </View>

                    </View>
                    <Text style={profileStyles.name}>UserName</Text>
                    <Text style={profileStyles.title}>Your Account</Text>
                    <View style={profileStyles.buttonContainer}>
                        <CustomButton
                            imageSource={require('../assets/icons/pencil1.png')}
                            label={(!variable ? "Save" : "Edit") + " Profile"}
                            onPress={handleEditCategory}
                        />
                    </View>
                    <View>
                        <TextIn label={"Email"} disabled={variable}/>
                        <TextIn label={"Password"} disabled={variable}/>
                        <TextIn label={"Phone Number"} disabled={variable}/>
                    </View>

                    <Text style={profileStyles.title}>Settings</Text>

                    <View style={profileStyles.mainContainer}>
                        <View style={profileStyles.settingsContainer}>
                            {/* First Row */}
                            <View style={profileStyles.row}>
                                <Text style={profileStyles.text}>Language</Text>
                                <Text style={profileStyles.text}>EN</Text>
                            </View>

                            {/* Second Row */}
                            <View style={profileStyles.row}>
                                <Text style={profileStyles.text}>Notification</Text>
                                <Switch value={isNotificationOn} onValueChange={onToggleSwitchNotif} color={"#9EDCE1"} />
                            </View>

                            {/* Third Row */}
                            <View style={profileStyles.row}>
                                <Text style={profileStyles.text}>Dark Mode</Text>
                                <Switch value={isModeOn} onValueChange={onToggleSwitchMode} color={"#9EDCE1"} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>

    );
};

const profileStyles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    container: {
        width: 170,
        height: 170,
        borderRadius: 90,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
        marginTop: 30
    },
    imageContainer: {
        width: 140,
        height: 140,
        borderRadius: 60,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 40,
    },
    name: {
        alignSelf: "center",
        marginTop: 5,
        fontWeight: "bold",
    },
    title: {
        marginTop: 40,
        fontSize: 16,
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsContainer: {

        paddingVertical: 10,
        width: "100%",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 13,
    },
    button: {
        width: 20,
        height: 20,
        borderRadius: 5,
        backgroundColor: "#F6F7FC"
    },
});


export default CategoryScreen;
