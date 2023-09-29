import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

const DateWidget = () => {
    return (
        <View style={styles.container}>
            <View
                style={{
                    padding: 16,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={styles.date}>
                    {dayjs().format('dddd, D MMMM YYYY')}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        bottom: 0,
        width: '100%',
        marginVertical: 10
    },
    date: {
        fontSize: 32,
        fontWeight: '500',
        color: 'black',
        fontFamily: 'Unbounded-Medium',
        textAlign: 'center'
    }
});

export default DateWidget;
