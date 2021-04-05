import { StyleSheet } from 'react-native';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: width/1.16,
        position: 'relative', 
        marginBottom: 20,
        marginTop: 30,
    },
    newDomainInput: {
        width: width/1.16,
        marginBottom: 50
    },
    btnCheck: {
        marginBottom: 20,
    },
    btnChange: {
        marginBottom: 200
    }
})

export { styles };