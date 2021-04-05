import { StyleSheet } from 'react-native';
import { width, height } from '../../../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    firstInput: {
        width: width/1.16,
        marginBottom: 20,
        marginTop: 30
    },
    secondInput: {
        width: width/1.16,
        marginBottom: 20,
    },
    packageLabel: {
        fontSize: 12,
        color: '#929caa'
    },
    costLabel:{
        fontSize: 12,
        color: '#929caa',
        marginBottom: 15
    },
    cost: {
        marginBottom: 15,
        marginLeft: 5,
        fontSize: 12
    },
    picker: {
        width: width/1.16, 
        marginBottom: 10,
        justifyContent: 'center'
    },
    hidePicker: {
        width: width/1.16, 
        marginBottom: 50,
        justifyContent: 'center',
        borderBottomColor: 'silver',
        borderBottomWidth: 0.5
    },
    buttonChange: {
        marginBottom: 200
    }
})

export { styles };