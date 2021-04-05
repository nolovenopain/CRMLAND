import { StyleSheet } from 'react-native';
import { blue } from '../Color/Color';

const SIZE = 20;
const checkedSIZE = 12;

const styles = StyleSheet.create({
    circle: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE/2,
        borderWidth: 1,
        borderColor: 'silver',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleChecked: {
        width: checkedSIZE,
        height: checkedSIZE,
        borderRadius: checkedSIZE/2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: blue
    }
});

export { styles };