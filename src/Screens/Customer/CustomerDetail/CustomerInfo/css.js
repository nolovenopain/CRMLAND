import { StyleSheet } from 'react-native';
import {width, height} from '../../../../Components/Elements/Dimensions/Dimensions'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    picker: {
        width: width/1.16,
        marginBottom: 10,
    },
    firstPicker: {
        width: width/1.16,
        marginBottom: 5,
        marginTop: 30
    },
    input: {
        width: width/1.16,
        marginBottom: 20
    },
    label: {
        fontSize: 12,
        color: '#929caa'
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