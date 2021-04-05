import { StyleSheet } from 'react-native';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../Components/Elements/Color/Color';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    header: {
        marginVertical: 40,
        width: width/1.16,
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold'  
    },
    blue: {
        color: blue
    },
    multiPicker: {
        marginBottom: 20,
        width: width/1.16,
    },
    label: {
        color: '#999999',
        marginBottom: 15,
        fontSize: 12
    },
    picker: {
        width: width/1.16,
        marginBottom: 10,
    },
    label: {
        fontSize: 12,
        color: '#929caa'
    },
    labelProject: {
        fontSize: 12,
        color: '#929caa',
        marginBottom: 10
    },
    btnUpdate: {
        marginTop: 30,
        marginBottom: 200
    },
    selectedItems: {
        marginTop: 10
    }
});

export { styles };