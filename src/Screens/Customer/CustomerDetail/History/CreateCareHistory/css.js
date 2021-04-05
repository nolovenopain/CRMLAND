import { StyleSheet } from 'react-native';
import { width } from '../../../../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    channel: {
        marginTop: 30,
        width: width/1.16,
        marginBottom: 20,
        position: 'relative'
    },
    label: {
        fontSize: 12,
        color: '#929caa',
    },
    dateTimePickerWrapper: {
        flexDirection: 'row',
        width: width/1.16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    datePickerWrapper: {
        width: (width/1.16)*3/5,
        height: 70,
    },
    datePicker: {
        width: (width/1.16)*3/5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
    },
    dateShow: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (width/1.16)*3/5*3/5,
        height: 40,
        borderBottomColor: 'silver',
        borderBottomWidth: 1.2,
    },
    calendarIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        height: 40,
        backgroundColor: 'gainsboro',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    timePickerWrapper: {
        width: (width/1.16)*2/5,
        height: 70,
    },
    timePicker: {
        width: (width/1.16)*2/5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
    },
    timeShow: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (width/1.16)*2/5*3.5/5,
        height: 40,
        borderBottomColor: 'silver',
        borderBottomWidth: 1.2,
    },
    iconTime: {
        height: 40,
        width: 45,
        backgroundColor: 'gainsboro',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        width: width/1.16,
        marginBottom: 50
    },
    createBtn: {
        marginBottom: 100
    }
});

export { styles };