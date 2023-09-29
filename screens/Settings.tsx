import { View, Text, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import ImageAuth from '../components/ImageAuth';
import Button from '../components/Button';

import { API_BASE_URL, API_GROUP_TOKEN } from '../config.json';
import { EmployeeDetails } from '../types/masurao.d';

const getEmployee = async (token: string): Promise<EmployeeDetails> => {
    try {
        const response = await fetch(`${API_BASE_URL}employees/me`, {
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

export default function WidgetsScreen({
    navigation
}: {
    navigation: DrawerNavigationHelpers;
}) {
    const [employeeData, setEmployeeData] = useState(null as EmployeeDetails);

    useEffect(() => {
        getItemAsync('token').then((token) => {
            if (!token) {
                navigation.navigate('Login');
            }
            getEmployee(token).then((data) => {
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
                padding: 50
            }}
        >
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
                                fontFamily: 'Unbounded-Bold'
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
                            fontWeight: '400',
                            textAlign: 'center',
                            fontFamily: 'Unbounded-Regular',
                            marginTop: 20
                        }}
                    >
                        {employeeData.work}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '400',
                            textAlign: 'center',
                            fontFamily: 'Unbounded-Regular',
                            marginTop: 20
                        }}
                    >
                        {employeeData.gender}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '400',
                            textAlign: 'center',
                            fontFamily: 'Unbounded-Regular',
                            marginTop: 16
                        }}
                    >
                        {employeeData.birth_date}
                    </Text>
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
            <Button
                onPress={() => {
                    navigation.navigate('Login');
                    setItemAsync('token', '');
                }}
                style={{
                    backgroundColor: '#7F56D9',
                    borderRadius: 8,
                    marginTop: 'auto'
                }}
                styleText={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: 'white',
                    fontFamily: 'Unbounded-Medium'
                }}
            >
                Log out
            </Button>
        </View>
    );
}
