import { SafeAreaView, View, Text, TextInput } from 'react-native';
import { setItemAsync, getItemAsync } from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { useFonts } from 'expo-font';

import Button from '../components/Button';

import { API_BASE_URL, API_GROUP_TOKEN } from '../config.json';
import { LoginResponse } from '../types/masurao.d';

export default function LoginScreen({
    navigation
}: {
    navigation: DrawerNavigationHelpers;
}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [fontsLoaded] = useFonts({
        'Unbounded-Regular': require('../assets/fonts/Unbounded-Regular.ttf'),
        'Unbounded-Medium': require('../assets/fonts/Unbounded-Medium.ttf'),
        'Unbounded-SemiBold': require('../assets/fonts/Unbounded-SemiBold.ttf'),
        'Unbounded-Bold': require('../assets/fonts/Unbounded-Bold.ttf')
    });

    useEffect(() => {
        getItemAsync('token').then((token) => {
            if (token) {
                navigation.navigate('Main');
            }
        });
    });

    async function login(email: string, password: string) {
        try {
            const response = await fetch(`${API_BASE_URL}employees/login`, {
                method: 'POST',
                headers: {
                    'X-Group-Authorization': API_GROUP_TOKEN,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            setEmail('');
            setPassword('');

            const json: LoginResponse = await response.json();

            if (json.detail) {
                throw Error(json.detail);
            }

            await setItemAsync('token', json.access_token);
        } catch (error) {
            alert(error);
        }
    }

    if (fontsLoaded) {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white'
                }}
            >
                <View style={{ paddingHorizontal: 38 }}>
                    <Text
                        style={{
                            fontSize: 28,
                            fontWeight: '600',
                            textAlign: 'center',
                            fontFamily: 'Unbounded-Bold'
                        }}
                    >
                        Log in to your account
                    </Text>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '400',
                            textAlign: 'center',
                            fontFamily: 'Unbounded-Regular',
                            marginTop: 16
                        }}
                    >
                        Welcome back! Please enter your details.
                    </Text>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 44 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '500',
                            fontFamily: 'Unbounded-Medium',
                            textAlign: 'left'
                        }}
                    >
                        Email
                    </Text>
                    <TextInput
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        style={{
                            height: 52,
                            width: 328,
                            marginTop: 10,
                            borderColor: '#D0D5DD',
                            borderWidth: 1,
                            borderRadius: 12,
                            paddingHorizontal: 20,
                            marginBottom: 20,
                            fontSize: 18,
                            fontFamily: 'Unbounded-Regular'
                        }}
                        placeholder="Enter your email"
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '500',
                            textAlign: 'left',
                            fontFamily: 'Unbounded-Medium'
                        }}
                    >
                        Password
                    </Text>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <TextInput
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                            style={{
                                flex: 1,
                                height: 52,
                                width: 328,
                                marginTop: 10,
                                borderColor: '#D0D5DD',
                                borderWidth: 1,
                                borderRadius: 12,
                                paddingHorizontal: 20,
                                marginBottom: 20,
                                fontSize: 18,
                                fontFamily: 'Unbounded-Regular'
                            }}
                            placeholder="********"
                        />
                    </View>
                    <Button
                        onPress={() =>
                            login(email, password).then(() => {
                                navigation.navigate('Main');
                            })
                        }
                        style={{
                            backgroundColor: '#7F56D9',
                            borderRadius: 8,
                            marginTop: 'auto'
                        }}
                        styleText={{
                            fontSize: 20,
                            fontWeight: '600',
                            color: 'white',
                            fontFamily: 'Unbounded-Medium'
                        }}
                    >
                        Sign in
                    </Button>
                </View>
            </SafeAreaView>
        );
    }
}
