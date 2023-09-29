import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, StyleProp, ImageStyle } from 'react-native';
import { API_GROUP_TOKEN } from '../config.json';
import { getItemAsync } from 'expo-secure-store';

const loadImage = async (
    url: string,
    token: string,
    onLoadEnd: (data: string | ArrayBuffer) => void
) => {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'X-Group-Authorization': API_GROUP_TOKEN
            }
        });
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onloadend = () => {
            onLoadEnd(reader.result);
        };
        reader.readAsDataURL(blob);
    } catch (error) {
        console.error(error);
    }
};

export default function ImageAuth({
    imageUrl,
    style
}: {
    imageUrl: string;
    style?: StyleProp<ImageStyle>;
}) {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        getItemAsync('token').then((token) => {
            if (token) {
                loadImage(imageUrl, token, setImageData);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            {imageData && <Image source={{ uri: imageData }} style={[style]} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
