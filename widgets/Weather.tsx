import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    Accuracy
} from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import dayjs from 'dayjs';

import { API_WEATHER_BASE_URL, API_WEATHER_TOKEN } from '../config.json';

import { Forecast, Weather } from '../types/weather.d';

const getCurrentLocation = async () => {
    try {
        const { granted } = await requestForegroundPermissionsAsync();

        if (!granted) {
            alert('Permission to access location was denied');
            return;
        }

        const location = await getCurrentPositionAsync({
            accuracy: Accuracy.Highest
        });

        return location.coords;
    } catch (error) {
        alert(error);
    }
};

const getWeather = async (lat: number, long: number) => {
    try {
        const response = await fetch(
            `${API_WEATHER_BASE_URL}/weather?lat=${lat}&lon=${long}&appid=${API_WEATHER_TOKEN}&units=metric`
        );

        const json = await response.json();
        return json;
    } catch (error) {
        return { message: 'Something went wrong', cod: 500 };
    }
};

const getForecast = async (lat: number, long: number) => {
    try {
        const response = await fetch(
            `${API_WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${long}&cnt=4&appid=${API_WEATHER_TOKEN}&units=metric`
        );

        const json = await response.json();
        return json;
    } catch (error) {
        return { message: 'Something went wrong', cod: 500 };
    }
};

const WeatherWidget = forwardRef((_props, ref) => {
    const [weather, setWeather] = useState<Weather>(null);
    const [forecast, setForecast] = useState<Forecast>(null);
    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        refresh() {
            setIsLoading(true);
            getCurrentLocation()
                .then((data) => {
                    getWeather(data.latitude, data.longitude).then((data) => {
                        setWeather(data);
                    });
                    getForecast(data.latitude, data.longitude).then((data) => {
                        setForecast(data);
                    });
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }));

    useEffect(() => {
        setIsLoading(true);
        getCurrentLocation()
            .then((data) => {
                getWeather(data.latitude, data.longitude).then((data) => {
                    setWeather(data);
                });
                getForecast(data.latitude, data.longitude).then((data) => {
                    setForecast(data);
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <LinearGradient
            colors={['#023a6c', '#1a6ba3']}
            style={styles.container}
        >
            {(isLoading || !weather || !forecast) && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ActivityIndicator size="large" color="blue" />
                </View>
            )}
            {weather && (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 16
                    }}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Svg
                            style={{ marginRight: 4 }}
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <Path
                                d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                                stroke="#8d9ba8"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <Path
                                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                                stroke="#8d9ba8"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '500',
                                color: 'white',
                                fontFamily: 'Unbounded-Medium'
                            }}
                        >
                            Strasbourg, {weather.sys.country}
                        </Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Svg
                            style={{ marginRight: 4 }}
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <Path
                                d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                stroke="#8d9ba8"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '500',
                                color: 'white',
                                fontFamily: 'Unbounded-Medium'
                            }}
                        >
                            {dayjs().format('dddd, hh:mm A')}
                        </Text>
                    </View>
                </View>
            )}
            {weather && (
                <View
                    style={{
                        marginVertical: 16,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'baseline' }}
                    >
                        <Text
                            style={{
                                fontWeight: '600',
                                fontSize: 42,
                                color: 'white',
                                fontFamily: 'Unbounded-SemiBold'
                            }}
                        >
                            {Math.round(weather.main.temp)}
                        </Text>
                        <Text
                            style={{
                                fontWeight: '500',
                                fontSize: 21,
                                color: 'white',
                                fontFamily: 'Unbounded-Medium'
                            }}
                        >
                            °C
                        </Text>
                    </View>
                    <View>
                        <Image
                            source={{
                                uri: 'https://openweathermap.org/img/wn/10d@2x.png'
                            }}
                            width={76}
                            height={76}
                        />
                    </View>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <Text
                                style={{
                                    color: '#8d9ba8',
                                    fontFamily: 'Unbounded-Regular',
                                    fontSize: 12
                                }}
                            >
                                Pression:
                            </Text>
                            <Text
                                style={{
                                    marginLeft: 4,
                                    color: 'white',
                                    fontFamily: 'Unbounded-Regular',
                                    fontSize: 12
                                }}
                            >
                                {weather.main.pressure} hPa
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <Text
                                style={{
                                    color: '#8d9ba8',
                                    fontFamily: 'Unbounded-Regular',
                                    fontSize: 12
                                }}
                            >
                                Wind:
                            </Text>
                            <Text
                                style={{
                                    marginLeft: 4,
                                    color: 'white',
                                    fontFamily: 'Unbounded-Regular',
                                    fontSize: 12
                                }}
                            >
                                {(weather.wind.speed * 3.6).toFixed(2)} km/h
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <Text
                                style={{
                                    color: '#8d9ba8',
                                    fontFamily: 'Unbounded-Regular',
                                    fontSize: 12
                                }}
                            >
                                Humidity:
                            </Text>
                            <Text
                                style={{
                                    marginLeft: 4,
                                    color: 'white',
                                    fontFamily: 'Unbounded-Regular',
                                    fontSize: 12
                                }}
                            >
                                {weather.main.humidity}%
                            </Text>
                        </View>
                    </View>
                </View>
            )}
            {weather && (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 16
                    }}
                >
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <Path
                                d="M17 18C17 16.6739 16.4732 15.4021 15.5355 14.4645C14.5979 13.5268 13.3261 13 12 13C10.6739 13 9.40215 13.5268 8.46447 14.4645C7.52678 15.4021 7 16.6739 7 18M12 2V9M12 2L8 6M12 2L16 6M4.22 10.22L5.64 11.64M1 18H3M21 18H23M18.36 11.64L19.78 10.22M23 22H1"
                                stroke="#8d9ba8"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                        <Text
                            style={{
                                color: 'white',
                                marginLeft: 4,
                                fontWeight: '500',
                                fontFamily: 'Unbounded-Medium',
                                fontSize: 12
                            }}
                        >
                            {dayjs(weather.sys.sunrise * 1000).format(
                                'hh:mm A'
                            )}
                        </Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <Path
                                d="M17 18C17 16.6739 16.4732 15.4021 15.5355 14.4645C14.5979 13.5268 13.3261 13 12 13C10.6739 13 9.40215 13.5268 8.46447 14.4645C7.52678 15.4021 7 16.6739 7 18M12 9V2M12 9L16 5M12 9L8 5M4.22 10.22L5.64 11.64M1 18H3M21 18H23M18.36 11.64L19.78 10.22M23 22H1"
                                stroke="#8d9ba8"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                        <Text
                            style={{
                                color: 'white',
                                marginLeft: 4,
                                fontWeight: '500',
                                fontFamily: 'Unbounded-Medium',
                                fontSize: 12
                            }}
                        >
                            {dayjs(weather.sys.sunset * 1000).format('hh:mm A')}
                        </Text>
                    </View>
                </View>
            )}
            {forecast && (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 16
                    }}
                >
                    {forecast.list.map((item, index) => (
                        <View key={index} style={{ alignItems: 'center' }}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: '500',
                                    fontFamily: 'Unbounded-Medium',
                                    fontSize: 12
                                }}
                            >
                                {dayjs(item.dt * 1000).format('hh:mm A')}
                            </Text>
                            <Image
                                source={{
                                    uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`
                                }}
                                width={48}
                                height={48}
                            />
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: '500',
                                    fontFamily: 'Unbounded-Medium',
                                    fontSize: 12
                                }}
                            >
                                {Math.round(item.main.temp)}°C
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </LinearGradient>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        width: '100%',
        marginVertical: 10,
        padding: 16
    },
    titleContainer: {
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEF1F4',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 4
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    },
    bodyContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default WeatherWidget;
