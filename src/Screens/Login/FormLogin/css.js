import { StyleSheet } from "react-native";
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../Components/Elements/Color/Color';

const styles = StyleSheet.create({
    container: {

    },
    titleWrapper: {
        width: width/1.16,
    },
    title: {
        fontSize: 22,
        color: blue,
        marginBottom: 30,
        fontWeight: "bold"
    },
    input: {
        alignItems: 'center',
    },
    emailInput: {
        width: width/1.16,
        marginBottom: 20
    },
    passwordInput: {
        width: width/1.16,
        marginBottom: 20
    },
});

export { styles };
