import { StyleSheet } from 'react-native';
import { width, height } from '../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../Components/Elements/Color/Color';

const SIZE = 40;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',  
        width: width
    },
    ticketList: {
        width: width,
        marginTop: 10,
        height: height - 150,
    },
    scrollToTop: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: 10,
        backgroundColor: orange,
        justifyContent: 'center',
        alignItems: 'center',
        top: height/1.45,
        left: width/1.15,
        opacity: 0.6
    },
    create: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: 10,
        backgroundColor: blue,
        justifyContent: 'center',
        alignItems: 'center',
        top: height/1.45 - 50,
        left: width/1.15,
        opacity: 0.6
    },
    noHaveTicket: {
        fontSize: 18,
        color: 'gray',
        marginTop: 50
    },
    itemLoader: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 30
    }
})

export { styles }