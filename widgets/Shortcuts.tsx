import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Linking,
    StyleSheet
} from 'react-native';
import { Path, Svg } from 'react-native-svg';

const ShortcutWidget = () => {
    return (
        <View style={styles.container}>
            <View style={styles.shortcutContainer}>
                <TouchableOpacity
                    onPress={() => Linking.openURL('mailto:')}
                    activeOpacity={0.8}
                >
                    <View style={styles.iconContainer}>
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <Path
                                d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6"
                                stroke="#101828"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Mail</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Linking.openURL('https://www.google.com')}
                    activeOpacity={0.8}
                >
                    <View style={styles.iconContainer}>
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <Path
                                d="M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M22 12H2M12 22C6.47715 22 2 17.5228 2 12M12 22C14.5013 19.2616 15.9228 15.708 16 12C15.9228 8.29203 14.5013 4.73835 12 2M12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2M2 12C2 6.47715 6.47715 2 12 2"
                                stroke="#101828"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Navigator</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Linking.openURL('sms:')}
                    activeOpacity={0.8}
                >
                    <View style={styles.iconContainer}>
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <Path
                                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                                stroke="#101828"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Messages</Text>
                    </View>
                </TouchableOpacity>
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
        width: '100%'
    },
    shortcutContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        marginBottom: 20
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: '#EEF1F4',
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 5,
        borderRadius: 16,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    labelContainer: {
        alignItems: 'center'
    },
    label: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        fontSize: 12,
        fontWeight: '500',
        fontFamily: 'Unbounded-Medium'
    }
});

export default ShortcutWidget;
