import { View, Text, ActivityIndicator, Linking } from 'react-native';
import { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getItemAsync } from 'expo-secure-store';
import Svg, { Path } from 'react-native-svg';

import Button from '../components/Button';
import ImageAuth from '../components/ImageAuth';

import { API_BASE_URL, API_GROUP_TOKEN } from '../config.json';
import { EmployeeDetails } from '../types/masurao.d';

const getEmployeeById = async (
    token: string,
    id: number
): Promise<EmployeeDetails> => {
    try {
        const response = await fetch(`${API_BASE_URL}employees/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'X-Group-Authorization': API_GROUP_TOKEN,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export default function EmployeeScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { employeeId } = route.params as { employeeId: number };
    const [employeeData, setEmployeeData] = useState(null as EmployeeDetails);

    useEffect(() => {
        getItemAsync('token').then((token) => {
            if (!token) {
                // @ts-ignore
                navigation.navigate('Login');
            }
            getEmployeeById(token, employeeId).then((data) => {
                setEmployeeData(data);
            });
        });
    }, []);

    return (
        <View
            style={{
                flex: 1,
                position: 'relative',
                backgroundColor: 'white',
                paddingTop: 50
            }}
        >
            <Button
                onPress={() => navigation.goBack()}
                style={{ alignItems: 'flex-start' }}
            >
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M19 12H5M5 12L12 19M5 12L12 5"
                        stroke="#101828"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
            </Button>
            {employeeData ? (
                <View>
                    <ImageAuth
                        imageUrl={`${API_BASE_URL}employees/${employeeData.id}/image`}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 999,
                            marginTop: 100
                        }}
                    />
                    <View style={{ marginTop: 20 }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '600',
                                textAlign: 'center',
                                fontFamily: 'Unbounded-Medium'
                            }}
                        >{`${employeeData.name} ${employeeData.surname}`}</Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '400',
                                textAlign: 'center',
                                fontFamily: 'Unbounded-Regular'
                            }}
                        >{`${employeeData.email}`}</Text>
                    </View>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '600',
                            textAlign: 'center',
                            marginTop: 20,
                            fontFamily: 'Unbounded-Medium'
                        }}
                    >
                        {employeeData.work}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '400',
                            textAlign: 'center',
                            marginTop: 20,
                            fontFamily: 'Unbounded-Regular'
                        }}
                    >
                        {employeeData.gender}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '400',
                            textAlign: 'center',
                            marginTop: 16,
                            fontFamily: 'Unbounded-Regular'
                        }}
                    >
                        {employeeData.birth_date}
                    </Text>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 20
                        }}
                    >
                        <Button
                            onPress={() =>
                                Linking.openURL(
                                    `mailto:${employeeData.email}?subject=Subject&body=Description`
                                )
                            }
                            style={{
                                height: 50,
                                width: '70%',
                                marginTop: 80,
                                borderColor: '#EEF1F4',
                                borderWidth: 1,
                                borderRadius: 12,
                                marginBottom: 20
                            }}
                            styleText={{
                                fontSize: 18,
                                fontWeight: '600',
                                color: 'black',
                                fontFamily: 'Unbounded-Medium'
                            }}
                        >
                            Send an email
                        </Button>
                    </View>
                </View>
            ) : (
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
        </View>
    );
}
