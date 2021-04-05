import { StyleSheet } from 'react-native';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../Components/Elements/Color/Color';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    basicInfo: {
        width: width/1.16,
        marginTop: 20
    },
    address: {
        marginBottom: 20
    },
    input: {
        marginBottom: 20
    },
    basicTitle: {
        marginBottom: 30
    },
    classifiedTitle: {
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    left: {
        width: width/1.16 - 30
    },
    right: {
        width: 30
    },
    title: {
        fontSize: 16,
        color: blue,
        fontWeight: 'bold'
    },
    advancedInfo: {
        width: width/1.16,
        marginTop: 10
    },
    pronoun: {
        height: 50,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        marginBottom: 20
    },
    projectOfCustomer: {
        height: 50,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        marginBottom: 20
    },
    groupOfCustomer: {
        height: 50,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        marginBottom: 20
    },
    typeOfCustomer: {
        height: 50,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        marginBottom: 20
    },
    customerBase: {
        height: 50,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        marginBottom: 50
    },
    createNew: {
        marginBottom: 20
    },
    cancel: {
        marginBottom: 50
    },
    picker: {
        width: width/1.16,
        marginBottom: 5
    },
    firstPicker: {
        width: width/1.16,
        marginBottom: 5
    },
    label: {
        fontSize: 12,
        color: '#929caa',
    },
    multiPicker: {      
        width: width/1.16,
        marginBottom: 5
    },
    labelProject: {
        fontSize: 12,
        color: '#929caa',
    },
    selectedItems: {
        marginTop: 10
    },
    hideForm: {
        marginBottom: 30
    },
    birthdayWrapper: {
        marginBottom: 20
    },
    choseBirthday: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    birthday: {
        borderBottomColor: 'silver',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        width: width/1.5,
        height: 40
    },
    birthdayIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width/1.16 - width/1.5,
        backgroundColor: 'gainsboro',
        height: 40,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    birthdayText: {
        fontSize: 12
    }
});

export { styles };