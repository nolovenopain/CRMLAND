import { StyleSheet } from 'react-native';
import { width, height } from '../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../Components/Elements/Color/Color';

const SIZE = 100

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginBottom: 20
    },
    dayNameWrapper: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE/2,
        backgroundColor: 'lavender',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    dayName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'gray' 
    },
    dateWrapper: {
        height: 100,
        width: width/2,
        justifyContent: 'center',
    },
    date: {
        fontWeight: 'bold',
        fontSize: 30,
       
        marginLeft: 30
    },
    jobListItem: {
        width: width/1.1,
        backgroundColor: '#fff',
        borderRadius: 30,
        flexDirection: 'row',
        marginBottom: 10
    },
    left: {
        width: width/4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: blue,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    right: {
        width: width/1.65,
    },
    title: {
        marginLeft: 15,
        marginVertical: 5,
        fontWeight: 'bold',
        fontSize: 16
    },
    underline: {
        width: width/1.7,
        borderWidth: 0.4,
        borderColor: 'silver',
        marginLeft: 15,
        marginBottom: 5
    },
    description: {
        marginLeft: 15,
        marginBottom: 7
    },
    time: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})

export { styles };