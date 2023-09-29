import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

import { API_NASA_BASE_URL, API_NASA_TOKEN } from '../config.json';
import { Nasa } from '../types/nasa.d';

const NasaWidget = () => {
    const [data, setData] = useState<Nasa>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getRequest = async () => {
        try {
            const response = await fetch(
                `${API_NASA_BASE_URL}/planetary/apod?api_key=${API_NASA_TOKEN}`
            );
            const json = await response.json();
            return json;
        } catch (error) {
            return { message: 'Something went wrong', error };
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getRequest()
            .then((data) => {
                setData(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="blue" />
            ) : (
                data && (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: data.url }}
                            style={{
                                width: '100%',
                                height: 276,
                                borderRadius: 16
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 16,
                                left: 16
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <Image
                                    source={require('../assets/NASA_logo.png')}
                                    style={{ width: 20, height: 20 }}
                                />
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: '600',
                                        fontSize: 16,
                                        marginLeft: 8,
                                        fontFamily: 'Unbounded-Medium'
                                    }}
                                >
                                    {data.title}
                                </Text>
                            </View>
                            <Text
                                style={{
                                    color: '#8d9ba8',
                                    fontSize: 12,
                                    fontFamily: 'Unbounded-Regular'
                                }}
                            >
                                {data.copyright} - {data.date}
                            </Text>
                        </View>
                    </View>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        marginBottom: 20,
        width: '100%',
        borderRadius: 16
    },
    imageContainer: {
        width: '100%',
        position: 'relative'
    },
    picTitleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 8
    },
    picTitle: {
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: '600'
    }
});

export default NasaWidget;
