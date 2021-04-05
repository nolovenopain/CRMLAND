import { StyleSheet } from 'react-native';
import { width, height } from '../../../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteLogo: {
        marginBottom: 40,
        marginTop: 50
    },
    alert: {
        width: width/1.2,
        marginBottom: 60,
    },
    alertText: {
        fontSize: 13,
        color: '#686868',
        textAlign: 'center',
        lineHeight: 24
    },
    input: {
        width: width/1.16,
        marginBottom: 50
    },
    iconOK: {
        position: 'absolute',
        marginLeft: width/1.25,
    },
    deleteButton: {
        marginBottom: 20
    },
    backButton: {
        marginBottom: 70
    }
})

export { styles };