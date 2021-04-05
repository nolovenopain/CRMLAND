import { StyleSheet } from 'react-native';
import { width, height } from '../../../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../../../Components/Elements/Color/Color';

const SIZE = 40;
const statusSIZE = 15;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    systemNotificationsList: {
        width: width,
        height: height - 140,
    },
    scrollToTop: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: 10,
        backgroundColor: orange,
        justifyContent: 'center',
        alignItems: 'center',
        top: height/1.42,
        left: width/1.15,
        opacity: 0.6
    },
    item: {
        width: width,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        width: width/1.1,
        height: 70,
        borderBottomColor: 'silver',
        borderBottomWidth: 0.5,
        alignItems: 'center',
    },
    statusCircle: {
        width: statusSIZE,
        height: statusSIZE,
        borderRadius: statusSIZE/2,
    },
    content: {
        marginLeft: 15,
        width: width/1.65,
    },
    topContent: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#3d3e40',
        marginBottom: 3
    },
    bottomContent: {
        fontSize: 10,
        color: '#666666'
    },
    timeDate: {
        
    },
    time: {
        color: blue,
        fontSize: 11,
        marginLeft: 15
    },
    itemLoader: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 30
    },
    noNoti: {
        top: height/6,
        alignItems: 'center',
        
    },
    bellImage: {
        marginBottom: 25
    },
    fistText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 20
    },
    secondText: {
        fontSize: 10
    },
})

export { styles }