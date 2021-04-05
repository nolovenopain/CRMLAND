import { StyleSheet } from 'react-native';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../../Components/Elements/Color/Color';

const statusSIZE = 15;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerBody: {
        width: width,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftHeaderBody: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#3d3e40',
    },
    left: {
        width: width/1.1 - 70
    },
    rightHeaderBody: {
        width: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightHeaderText: {
        fontSize: 10,
        color: '#3d3e40',
    },
    ticket: {
        width: width,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 30
    },
    ticketInside: {
        marginTop: 10,
        marginBottom: 20
    },
    row: {
        flexDirection: 'row',
        width: width/1.1,
        height: 50,
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
        backgroundColor: 'red'
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
        width: width/1.6,
    },
    topContent: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#3d3e40',
        marginBottom: 3
    },
    bottomContent: {
        fontSize: 11,
        color: '#666666'
    },
    timeDate: {
        width: width/4.5,
        alignItems: 'center',
        marginLeft: 10
    },
    time: {
        color: blue,
        fontSize: 11,
    },
    noTicket: {
        color: 'gray'
    }
});

export { styles };