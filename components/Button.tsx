import { ReactNode } from 'react';
import {
    StyleSheet,
    Text,
    StyleProp,
    ViewStyle,
    TextStyle,
    TouchableOpacity
} from 'react-native';

export default function Button({
    children,
    onPress,
    style,
    styleText
}: {
    children: ReactNode;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    styleText?: StyleProp<TextStyle>;
}) {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <Text style={[styleText]}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        backgroundColor: 'white'
    }
});
