import {
    StyleSheet,
} from "react-native";
import { blue } from '../Color/Color'

const SIZE = 65;

export default StyleSheet.create({
    // viewBtn: {
    //     position: 'absolute',
    //     alignItems: 'center',
    // },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        backgroundColor: blue,
        opacity: 0.9,
    }
});