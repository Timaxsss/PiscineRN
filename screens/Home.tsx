import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { useEffect, useState } from 'react';
import { getItemAsync } from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

import ImageAuth from '../components/ImageAuth';

import { API_BASE_URL, API_GROUP_TOKEN } from '../config.json';
import { Employee } from '../types/masurao.d';
import { Path, Svg } from 'react-native-svg';

const getEmployee = async (token: string): Promise<Employee[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}employees`, {
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

export default function HomeScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [employeesData, setEmployees] = useState<Employee[]>([]);
    const [searchResults, setSearchResults] = useState<Employee[]>([]);
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    const handleSearchChange = (text: string) => {
        setSearch(text);

        if (text === '') {
            setSearchResults(employeesData);
        } else {
            const filteredEmployees = employeesData.filter(
                (employee) =>
                    (
                        employee.name.toLowerCase() +
                        ' ' +
                        employee.surname.toLowerCase()
                    ).includes(text.toLowerCase()) ||
                    employee.email.toLowerCase().includes(text.toLowerCase()) ||
                    (
                        employee.surname.toLowerCase() +
                        ' ' +
                        employee.name.toLowerCase()
                    ).includes(text.toLowerCase())
            );
            setSearchResults(filteredEmployees);
        }
    };

    useEffect(() => {
        getItemAsync('token').then((token) => {
            getEmployee(token).then((data) => {
                setEmployees(data);
                setSearchResults(data);
                setIsLoading(false);
            });
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ padding: 16 }}>
                <Svg
                    style={{ position: 'absolute', top: 40, left: 32 }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <Path
                        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
                <TextInput
                    onChangeText={(text) => handleSearchChange(text)}
                    value={search}
                    style={{
                        height: 52,
                        width: '100%',
                        marginTop: 10,
                        paddingLeft: 52,
                        borderColor: '#D0D5DD',
                        borderWidth: 1,
                        borderRadius: 12,
                        paddingHorizontal: 20,
                        fontSize: 14,
                        fontFamily: 'Unbounded-Regular'
                    }}
                    placeholder="Search an employee"
                />
            </View>
            {isLoading ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ActivityIndicator size="large" color="blue" />
                </View>
            ) : (
                <ScrollView>
                    <View
                        style={{
                            flex: 1,
                            paddingTop: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {searchResults.length > 0 ? (
                            searchResults.map((employee) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    key={employee.id}
                                    onPress={() =>
                                        // @ts-ignore
                                        navigation.navigate('Employee', {
                                            employeeId: employee.id
                                        })
                                    }
                                    style={{
                                        width: 300,
                                        height: 320,
                                        borderWidth: 1,
                                        borderColor: '#EEF1F4',
                                        borderRadius: 20,
                                        alignItems: 'center',
                                        margin: 10
                                    }}
                                >
                                    <ImageAuth
                                        imageUrl={`${API_BASE_URL}employees/${employee.id}/image`}
                                        style={{
                                            width: 300,
                                            height: 250,
                                            borderTopLeftRadius: 20,
                                            borderTopRightRadius: 20
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: '600',
                                            marginTop: 8,
                                            fontFamily: 'Unbounded-Medium'
                                        }}
                                    >{`${employee.name} ${employee.surname}`}</Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: 'Unbounded-Regular'
                                        }}
                                    >
                                        {employee.email}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={{ fontSize: 16 }}>No results...</Text>
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        backgroundColor: 'white'
    },
    button: {
        width: '20%',
        paddingTop: 30
    },
    button_view: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_view_text: {
        color: '#545f71',
        fontSize: 12,
        textAlign: 'center'
    },
    button_text: {
        fontSize: 24,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#545f71',
        textAlign: 'center'
    }
});
