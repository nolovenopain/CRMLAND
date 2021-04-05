import { StyleSheet } from 'react-native'
import { width, height } from '../../../Components/Elements/Dimensions/Dimensions'

const styles = StyleSheet.create({
    container: {
        flex: 2,
        marginBottom: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        fontStyle: "normal",
        color: "#5abebd",
        marginBottom: 30,
        marginLeft: 22
    },
    input: {
        alignItems: 'center',
    },
    emailInput: {
        width: width/1.16,
        justifyContent: 'center',
    },
});
export {styles}

