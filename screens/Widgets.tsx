import { ScrollView, View, RefreshControl } from 'react-native';
import { useState, useRef } from 'react';

import Button from '../components/Button';

import DateWidget from '../widgets/Date';
import WeatherWidget from '../widgets/Weather';
import TaskManagerWidget from '../widgets/TaskManager';
import ShortcutsWidget from '../widgets/Shortcuts';
import CryptoWidget from '../widgets/Crypto';
import ExchangeRateWidget from '../widgets/ExchangeRate';
import NewsWidget from '../widgets/News';
import MapWidget from '../widgets/Map';
import NasaWidget from '../widgets/Nasa';

export default function WidgetsScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const [toggleCustom, setToggleCustom] = useState(false);
    const weatherRef = useRef();
    const cryptoRef = useRef();
    const newsRef = useRef();

    const [nasaState, setNasaState] = useState(true);
    const [weatherState, setWeatherState] = useState(true);
    const [dateState, setDateState] = useState(true);
    const [taskManagerState, setTaskManagerState] = useState(true);
    const [cryptoState, setCryptoState] = useState(true);
    const [exchangeRateState, setExchangeRateState] = useState(true);
    const [newsState, setNewsState] = useState(true);
    const [mapState, setMapState] = useState(true);
    const [shortcutsState, setShortcutsState] = useState(true);

    const onRefresh = () => {
        setRefreshing(true);
        (weatherRef.current as any).refresh();
        (cryptoRef.current as any).refresh();
        (newsRef.current as any).refresh();
        setRefreshing(false);
    };

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <ScrollView
                style={{ backgroundColor: 'white' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Button
                    onPress={() => setToggleCustom(!toggleCustom)}
                    style={{
                        borderWidth: 1,
                        borderColor: '#D0D5DD',
                        borderRadius: 16,
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 20,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    styleText={{
                        fontFamily: 'Unbounded-Regular',
                        fontSize: 12,
                        color: 'black'
                    }}
                >
                    Widget cusomizatiom menu
                </Button>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 4,
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: '#D0D5DD',
                        paddingVertical: 16,
                        display: toggleCustom ? 'flex' : 'none'
                    }}
                >
                    <Button
                        onPress={() => setDateState(!dateState)}
                        style={{
                            borderColor: '#D0D5DD',
                            borderRadius: 16,
                            borderWidth: 1,
                            backgroundColor: dateState ? '#7F56D9' : 'white',
                            width: 'auto',
                            marginHorizontal: 4,
                            marginVertical: 4
                        }}
                        styleText={{
                            color: dateState ? 'white' : 'black',
                            fontFamily: 'Unbounded-Regular',
                            fontSize: 12
                        }}
                    >
                        Date
                    </Button>
                    <Button
                        onPress={() => setNasaState(!nasaState)}
                        style={{
                            borderColor: '#D0D5DD',
                            borderRadius: 16,
                            borderWidth: 1,
                            backgroundColor: nasaState ? '#7F56D9' : 'white',
                            width: 'auto',
                            marginHorizontal: 4,
                            marginVertical: 4
                        }}
                        styleText={{
                            color: nasaState ? 'white' : 'black',
                            fontFamily: 'Unbounded-Regular',
                            fontSize: 12
                        }}
                    >
                        Nasa
                    </Button>
                    <Button
                        onPress={() => setWeatherState(!weatherState)}
                        style={{
                            borderColor: '#D0D5DD',
                            borderRadius: 16,
                            borderWidth: 1,
                            backgroundColor: weatherState ? '#7F56D9' : 'white',
                            width: 'auto',
                            marginHorizontal: 4,
                            marginVertical: 4
                        }}
                        styleText={{
                            color: weatherState ? 'white' : 'black',
                            fontFamily: 'Unbounded-Regular',
                            fontSize: 12
                        }}
                    >
                        Weather
                    </Button>
                    <Button
                        onPress={() => setTaskManagerState(!taskManagerState)}
                        style={{
                            borderColor: '#D0D5DD',
                            borderRadius: 16,
                            borderWidth: 1,
                            backgroundColor: taskManagerState
                                ? '#7F56D9'
                                : 'white',
                            width: 'auto',
                            marginHorizontal: 4,
                            marginVertical: 4
                        }}
                        styleText={{
                            color: taskManagerState ? 'white' : 'black',
                            fontFamily: 'Unbounded-Regular',
                            fontSize: 12
                        }}
                    >
                        Task Manager
                    </Button>
                    <Button
                        onPress={() => setCryptoState(!cryptoState)}
                        style={{
                            borderColor: '#D0D5DD',
                            borderRadius: 16,
                            borderWidth: 1,
                            backgroundColor: cryptoState ? '#7F56D9' : 'white',
                            width: 'auto',
                            marginHorizontal: 4,
                            marginVertical: 4
                        }}
                        styleText={{
                            color: cryptoState ? 'white' : 'black',
                            fontFamily: 'Unbounded-Regular',
                            fontSize: 12
                        }}
                    >
                        Crypto
                    </Button>
                    <Button
                        onPress={() => setExchangeRateState(!exchangeRateState)}
                        style={{
                            borderColor: '#D0D5DD',
                            borderRadius: 16,
                            borderWidth: 1,
                            backgroundColor: exchangeRateState
                                ? '#7F56D9'
                                : 'white',
                            width: 'auto',
                            marginHorizontal: 4,
                            marginVertical: 4
                        }}
                        styleText={{
                            color: exchangeRateState ? 'white' : 'black',
                            fontFamily: 'Unbounded-Regular',
                            fontSize: 12
                        }}
                    >
                        Exchange rate
                    </Button>
                    <Button
                        onPress={() => setNewsState(!newsState)}
                        style={{
                            borderColor: '#D0D5DD',
                            borderRadius: 16,
                            borderWidth: 1,
                            backgroundColor: newsState ? '#7F56D9' : 'white',
                            width: 'auto',
                            marginHorizontal: 4,
                            marginVertical: 4
                        }}
                        styleText={{
                            color: newsState ? 'white' : 'black',
                            fontFamily: 'Unbounded-Regular',
                            fontSize: 12
                        }}
                    >
                        News
                    </Button>
                    <Button
                        onPress={() => setMapState(!mapState)}
                        style={{
                            borderColor: '#D0D5DD',
                            borderRadius: 16,
                            borderWidth: 1,
                            backgroundColor: mapState ? '#7F56D9' : 'white',
                            width: 'auto',
                            marginHorizontal: 4,
                            marginVertical: 4
                        }}
                        styleText={{
                            color: mapState ? 'white' : 'black',
                            fontFamily: 'Unbounded-Regular',
                            fontSize: 12
                        }}
                    >
                        Map
                    </Button>
                    <Button
                        onPress={() => setShortcutsState(!shortcutsState)}
                        style={{
                            borderColor: '#D0D5DD',
                            borderRadius: 16,
                            borderWidth: 1,
                            backgroundColor: shortcutsState
                                ? '#7F56D9'
                                : 'white',
                            width: 'auto',
                            marginHorizontal: 4,
                            marginVertical: 4
                        }}
                        styleText={{
                            color: shortcutsState ? 'white' : 'black',
                            fontFamily: 'Unbounded-Regular',
                            fontSize: 12
                        }}
                    >
                        Shortcuts
                    </Button>
                </View>
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 16,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {dateState && <DateWidget />}
                    {nasaState && <NasaWidget />}
                    {weatherState && <WeatherWidget ref={weatherRef} />}
                    {taskManagerState && <TaskManagerWidget />}
                    {cryptoState && <CryptoWidget ref={cryptoRef} />}
                    {exchangeRateState && <ExchangeRateWidget />}
                    {newsState && <NewsWidget ref={newsRef} />}
                    {mapState && <MapWidget />}
                    {shortcutsState && <ShortcutsWidget />}
                </View>
            </ScrollView>
        </View>
    );
}
