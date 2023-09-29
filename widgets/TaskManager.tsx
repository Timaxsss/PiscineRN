import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import { Path, Svg } from 'react-native-svg';

import Button from '../components/Button';

const TaskManagerWidget = () => {
    const [task, setTask] = useState('');
    const [tasksList, setTasksList] = useState([]);

    const addTask = () => {
        if (task) {
            const newTask = { text: task, completed: false };
            setTasksList([...tasksList, newTask]);
            setTask('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Task Manager</Text>
            </View>
            <View style={styles.widgetContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={{
                            height: 48,
                            width: '74%',
                            borderColor: '#D0D5DD',
                            borderWidth: 1,
                            borderRadius: 12,
                            paddingHorizontal: 20,
                            marginBottom: 20,
                            fontSize: 14,
                            fontFamily: 'Unbounded-Regular'
                        }}
                        placeholder="Insert a task"
                        onChangeText={(text) => setTask(text)}
                        value={task}
                    />
                    <View style={{ width: '5%' }}></View>
                    <Button
                        onPress={addTask}
                        style={{
                            backgroundColor: '#7F56D9',
                            borderRadius: 8,
                            width: '2%',
                            height: 48
                        }}
                        styleText={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: 'white',
                            position: 'absolute'
                        }}
                    >
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <Path
                                d="M12 5V19M5 12H19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </Button>
                </View>
                <ScrollView style={{ maxHeight: 200 }}>
                    {tasksList.map((item, index) => (
                        <View key={index} style={styles.taskItem}>
                            <View style={{ flexDirection: 'row' }}>
                                <Checkbox
                                    color="#7F56D9"
                                    value={item.completed}
                                    onValueChange={() => {
                                        const newTasksList = [...tasksList];
                                        newTasksList[index].completed =
                                            !newTasksList[index].completed;
                                        setTasksList(newTasksList);
                                    }}
                                />
                                <Text
                                    style={{
                                        marginLeft: 16,
                                        fontSize: 14,
                                        fontWeight: '400',
                                        fontFamily: 'Unbounded-Regular',
                                        textDecorationLine: item.completed
                                            ? 'line-through'
                                            : 'none'
                                    }}
                                >
                                    {item.text}
                                </Text>
                            </View>
                            <Button
                                onPress={() => {
                                    const newTasksList = [...tasksList];
                                    newTasksList.splice(index, 1);
                                    setTasksList(newTasksList);
                                }}
                                style={{ height: 24 }}
                                styleText={{ position: 'absolute' }}
                            >
                                <Svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <Path
                                        d="M18 6L6 18M6 6L18 18"
                                        stroke="#101828"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </Svg>
                            </Button>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 10,
        backgroundColor: 'white',
        width: '100%',
        borderWidth: 1,
        borderColor: '#EEF1F4',
        borderRadius: 16
    },
    widgetContainer: {
        paddingTop: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 16,
        width: '90%'
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
        padding: 16
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Unbounded-Medium',
        width: '100%'
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'black'
    },
    taskItem: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 5,
        borderColor: '#EEF1F4',
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default TaskManagerWidget;
