import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle
} from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

import { Crypto } from '../types/crypto.d';

const getTrendingCrypto = async () => {
    try {
        const response = await fetch(
            'https://api.coingecko.com/api/v3/search/trending'
        );
        const json = await response.json();

        const trendingCrypto = json.coins.slice(0, 3).map(async (coin) => {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coin.item.id}&vs_currencies=usd`
            );

            const json = await response.json();
            return {
                id: coin.item.id,
                name: coin.item.name,
                price: json[coin.item.id].usd || 0,
                image: coin.item.large,
                symbol: coin.item.symbol
            };
        });

        return Promise.all(trendingCrypto);
    } catch (error) {
        console.error(error);
    }
};

const CryptoWidget = forwardRef((_props, ref) => {
    const [cryptoData, setCryptoData] = useState<Crypto[]>(null);
    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        refresh() {
            setIsLoading(true);
            getTrendingCrypto()
                .then((data) => {
                    setCryptoData(data);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }));

    useEffect(() => {
        setIsLoading(true);
        getTrendingCrypto()
            .then((data) => {
                setCryptoData(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: 'black',
                    textAlign: 'left',
                    fontFamily: 'Unbounded-Medium'
                }}
            >
                Trending crypto
            </Text>
            <View style={{ marginTop: 16, width: '100%' }}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (
                    cryptoData &&
                    cryptoData.map((crypto) => (
                        <View
                            key={crypto.id}
                            style={{
                                flexDirection: 'row',
                                width: '100%',
                                marginTop: 16
                            }}
                        >
                            <Image
                                source={{ uri: crypto.image }}
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 8
                                }}
                            />
                            <View style={{ marginLeft: 16 }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: '500',
                                            color: 'black',
                                            fontFamily: 'Unbounded-Medium'
                                        }}
                                    >
                                        {crypto.name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: '400',
                                            paddingLeft: 8,
                                            color: '#8d9ba8',
                                            fontFamily: 'Unbounded-Regular'
                                        }}
                                    >
                                        {crypto.symbol}
                                    </Text>
                                </View>
                                <Text style={styles.cryptoPrice}>
                                    {crypto.price} USD
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#EEF1F4',
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 16,
        marginVertical: 10,
        width: '100%',
        padding: 16
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    },
    cryptoPrice: {
        fontSize: 18,
        color: 'black',
        marginTop: 8,
        fontWeight: '500',
        fontFamily: 'Unbounded-Medium'
    }
});

export default CryptoWidget;
