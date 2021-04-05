import { StyleSheet } from 'react-native';
import { blue } from '../../Components/Elements/Color/Color';
import { width } from '../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({ 
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: width/1.16,
        height: width/1.5
    },
    titleWrapper: {
        width: width/1.16
    },
    title: {
        fontSize: 22,
        color: blue,
        fontWeight: "bold",
        marginBottom: 15
    },
    contentWrapper: {
        width: width/1.16,
        marginBottom: 50
    },
    content: {
        fontSize: 14,
        lineHeight: 25,
    },
    buttonWrapper: {
        marginBottom: 15
    }
});

export { styles };