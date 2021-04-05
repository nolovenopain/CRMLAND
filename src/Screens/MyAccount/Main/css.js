import { StyleSheet } from 'react-native';
import { width, height } from '../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../Components/Elements/Color/Color';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    hello: {
        height: height/6,
        width: width,
        backgroundColor: blue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    helloText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 15
    },
    balance: {
        width: width/2.3,
        height: height/25,
        backgroundColor: orange,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7
    },
    money: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10
    },
    iconWrapper: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forwardArrowWrapper: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    configs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        backgroundColor: '#fff',
        height: 70,
        marginBottom: 10
    },
    configText: {
        width: width/1.02 - 80,
    },
    topConfigText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
        marginLeft: 10,
        marginBottom: 5
    },
    bottomConfigText: {
        fontSize: 10,
        color: 'gray',
        marginLeft: 10
    },
    configTitle: {
        width: width/1.1,
        marginTop: 5,
        marginBottom: 15,
        fontWeight: 'bold',
        color: '#666666',
        marginLeft: 15
    },
    logOut: {
        width: width, 
        height: height/11,
        backgroundColor: orange,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 25,
        marginBottom: 35
    },
    logOutLabel: {
        marginLeft: 15,
        color: '#fff',
        fontSize: 14
    }

})

export { styles };