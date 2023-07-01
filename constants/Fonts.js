import * as Font from 'expo-font';

export const loadFonts = async () => {
    await Font.loadAsync({
        'Poppins-Regular': require('./fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./fonts/Poppins-Bold.ttf'),
        'Poppins-Light': require('./fonts/Poppins-Light.ttf'),
        'Poppins-ExtraLight': require('./fonts/Poppins-ExtraLight.ttf'),
        'Poppins-Medium': require('./fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('./fonts/Poppins-SemiBold.ttf'),
    });
};