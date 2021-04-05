import { StyleSheet } from 'react-native';
import { width } from '../../../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../../../Components/Elements/Color/Color';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        width: width,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: width,
        height: 350,
        resizeMode: 'stretch',
        marginBottom: 30,    
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        width: width/1.16
    },
    title: {
        color: blue,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    code: {
        color: 'gray',
        fontSize: 14
    },
    seeDemo: {
        marginBottom: 15
    }
});

export { styles };