import { StyleSheet } from 'react-native';
import { width, height } from '../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({ 
    container: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 22
    }
});

export { styles };