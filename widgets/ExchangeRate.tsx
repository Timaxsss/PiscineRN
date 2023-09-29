import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { API_CURRENCY_BASE_URL, API_CURRENCY_TOKEN } from '../config.json';
import { ExchangeRates } from '../types/exchange_rates.d';

const getExchangeRate = async (base: string, currencies: string[]) => {
    try {
        const response = await fetch(
            `${API_CURRENCY_BASE_URL}/latest?base=${base}&symbols=${currencies.join(
                ','
            )}&access_key=${API_CURRENCY_TOKEN}`
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

const ExchangeRateWidget = () => {
    const [data, setData] = useState<ExchangeRates>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getExchangeRate('EUR', ['USD', 'GBP', 'JPY'])
            .then((data) => {
                setData(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Exchange rate</Text>
                <Text style={{ fontFamily: 'Unbounded-Regular' }}>
                    Base EUR
                </Text>
            </View>
            {isLoading ? (
                <ActivityIndicator
                    size="large"
                    color="blue"
                    style={{ marginTop: 16 }}
                />
            ) : (
                data && (
                    <View>
                        <View
                            style={{
                                paddingHorizontal: 16,
                                paddingVertical: 16,
                                backgroundColor: '#EEF1F4'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: '500',
                                    fontFamily: 'Unbounded-Medium'
                                }}
                            >
                                USD
                            </Text>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: '500',
                                    fontFamily: 'Unbounded-Medium'
                                }}
                            >
                                {data.rates.GBP} €
                            </Text>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 16,
                                paddingVertical: 16
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: '500',
                                    fontFamily: 'Unbounded-Medium'
                                }}
                            >
                                GBP
                            </Text>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: '500',
                                    fontFamily: 'Unbounded-Medium'
                                }}
                            >
                                {data.rates.GBP} €
                            </Text>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 16,
                                paddingVertical: 16,
                                backgroundColor: '#EEF1F4'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: '500',
                                    fontFamily: 'Unbounded-Medium'
                                }}
                            >
                                JPY
                            </Text>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: '500',
                                    fontFamily: 'Unbounded-Medium'
                                }}
                            >
                                {data.rates.JPY} €
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
        width: '100%',
        borderRadius: 16,
        borderColor: '#EEF1F4',
        borderWidth: 1,
        marginVertical: 10,
        overflow: 'hidden'
    },
    titleContainer: {
        backgroundColor: 'white',
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEF1F4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Unbounded-Medium'
    }
});

export default ExchangeRateWidget;
