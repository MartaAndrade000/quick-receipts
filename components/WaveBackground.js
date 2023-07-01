import React from 'react';
import { View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const WaveBackground = () => {
    return (
        <View style={styles.container}>
            {/* Your other content here */}
            <Svg
                height="100%"
                width="100%"
                style={styles.wave}
                viewBox="0 0 1440 320"
            >
                <Path
                    fill="#DAF4EF" // Blue color for the wave
                    d="M0,224L48,234.7C96,245,192,267,288,272C384,277,480,267,576,240C672,213,768,171,864,165.3C960,160,1056,192,1152,202.7C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
            </Svg>
            <View style={styles.rectangle}></View>
        </View>
    );
};

const styles = {
    container: {
        position: 'absolute',
        bottom: 0,
        width: '120%',
        height: '100%',
    },
    wave: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 300,
    },
    rectangle: {
       marginTop: 70,
        width: '120%',
        height: '100%',
        backgroundColor: '#DAF4EF',
    },
};

export default WaveBackground;