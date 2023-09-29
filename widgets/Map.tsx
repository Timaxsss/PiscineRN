import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { useState } from 'react';

const MapWidget = () => {
    const [region, setRegion] = useState({
        latitude: 48.580002,
        longitude: 7.75,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={(region) => setRegion(region)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        bottom: 0,
        width: '100%',
        marginVertical: 10,
        borderRadius: 16,
        overflow: 'hidden'
    },
    map: {
        width: '100%',
        height: 250
    }
});

export default MapWidget;
