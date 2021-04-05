import { StyleSheet } from 'react-native';
import { width, height } from '../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../Components/Elements/Color/Color';

const SIZE = 40;

const styles = StyleSheet.create({
    container: {
        
    },
    create: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: 10,
        backgroundColor: blue,
        justifyContent: 'center',
        alignItems: 'center',
        top: height/1.42,
        left: width/1.15,
        opacity: 0.6
    },
})

export { styles };