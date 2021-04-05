import { StyleSheet } from 'react-native';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../../Components/Elements/Color/Color';

const itemSIZE = 55;
const avatarSIZE = 45;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        width: width/1.16,
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: avatarSIZE,
        height: avatarSIZE,
        borderRadius: avatarSIZE/2,
        backgroundColor: '#fff',
    },
    helloContent: {
        marginLeft: 10,
        justifyContent: 'center',
        width: width/ 1.55
    },
    hello: {
        color: '#fff',
        fontSize: 12,
    },
    name: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    noti: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    menu: {
        width: width,
        height: 330,
        alignItems: 'center',
        marginBottom: 35
    },
    topMenu: {
        width: width,
        height: 100,
        flexDirection: 'row',
    },
    bottomMenu: {
        width: width,
        height: 100,
        flexDirection: 'row'
    },
    topCircleWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width/4
    },
    bottomCircleWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width/4
    },
    circle: {
        width: itemSIZE,
        height: itemSIZE,
        borderRadius: itemSIZE/2,
        backgroundColor: blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 7,
    },
    menuLabel: {
        fontSize: 10,
        color: '#fff'
    },
    topUpAccount: {
        position: 'absolute',
        width: width/1.5,
        height: 50,
        borderRadius: 20,
        backgroundColor: orange,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 305,
    },
    moneyShow: {
        width: width/3,
        borderRightColor: '#fff',
        borderRightWidth: 1,
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    money: {
        color: '#fff',
        fontSize: 10,
        marginLeft: 7,
        fontWeight: 'bold'
    },
    topUp: {
        color: '#fff',
        fontSize: 10,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    topUpShow: {
        width: width/3,
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    count: {
        backgroundColor: 'red',
        height: 15,
        justifyContent: 'center',
        borderRadius: 3,
        marginLeft: -3
    },
    countNumber: {
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: 12,
        marginHorizontal: 3
    }  
});

export { styles };