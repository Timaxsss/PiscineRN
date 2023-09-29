import { SafeAreaView, View, Text } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { API_BASE_URL, API_GROUP_TOKEN } from '../config.json';

import ImageAuth from './ImageAuth';
import Button from './Button';

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

export default function Sidebar(props: {
    navigation: DrawerNavigationHelpers;
    state: any;
    descriptors: any;
}) {
    const [employeeData, setEmployee] = useState<EmployeeDetails>(null);

    useEffect(() => {
        getItemAsync('token').then((token) => {
            if (!token) {
                props.navigation.navigate('Login');
            }
            getEmployee(token).then((data) => {
                setEmployee(data);
            });
        });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Button
                onPress={() => props.navigation.closeDrawer()}
                style={{ position: 'absolute', top: 55, left: -20 }}
            >
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="#545F71"
                        strokeWidth="2"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                    />
                </Svg>
            </Button>
            {employeeData && (
                <ImageAuth
                    imageUrl={`${API_BASE_URL}employees/${employeeData.id}/image`}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 999,
                        marginTop: 100
                    }}
                />
            )}
            {employeeData && (
                <View style={{ marginTop: 20 }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            textAlign: 'center',
                            fontFamily: 'Unbounded-Medium'
                        }}
                    >{`${employeeData.name} ${employeeData.surname}`}</Text>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: '400',
                            textAlign: 'center',
                            fontFamily: 'Unbounded-Regular'
                        }}
                    >{`${employeeData.email}`}</Text>
                </View>
            )}
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={{ padding: 20 }}>
                <Button
                    onPress={() => {
                        props.navigation.navigate('Login');
                        setItemAsync('token', '');
                    }}
                    style={{ backgroundColor: '#7F56D9', borderRadius: 8 }}
                    styleText={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: 'white',
                        fontFamily: 'Unbounded-Medium'
                    }}
                >
                    Log out
                </Button>
            </View>
        </SafeAreaView>
    );
}
