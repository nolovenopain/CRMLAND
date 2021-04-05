import { StyleSheet } from 'react-native';
import { width, height } from '../../../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../../../Components/Elements/Color/Color';

const SIZE = 40;
const statusSIZE = 20;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    searchBar: {
        backgroundColor: blue,
        marginBottom: 10,
        width: width/1.02,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    CSKHScheduleList: {
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
        borderWidth: 1,
        borderColor: blue
    },
    statusRedCircle: {
        width: statusSIZE,
        height: statusSIZE,
        borderRadius: statusSIZE/2,
        backgroundColor: '#ff0000'
    },
    statusOrangeCircle: {
        width: statusSIZE,
        height: statusSIZE,
        borderRadius: statusSIZE/2,
        backgroundColor: orange
    },
    statusBlueCircle: {
        width: statusSIZE,
        height: statusSIZE,
        borderRadius: statusSIZE/2,
        backgroundColor: blue
    },
    content: {
        marginLeft: 15,
        width: width/1.5,
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
        alignItems: 'flex-end',
        width: width/6.5,
    },
    time: {
        color: blue,
        fontSize: 13
    },
    date: {
        fontSize: 10,
        color: '#666666'
    },
    noHaveCSKH: {
        fontSize: 18,
        color: 'gray',
        marginTop: 50
    }
})

export { styles }