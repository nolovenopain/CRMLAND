import { StyleSheet } from "react-native";
import { width, height } from '../../Components/Elements/Dimensions/Dimensions'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    header: {
        marginVertical: 40,
        width: width/1.1,
        alignItems: 'center',
    },
    tabNavigator: {
        marginBottom: 10
    },
    checkbox: {
        marginBottom: 20,
        marginLeft: 20
    },
    footer: {
        marginBottom: 50
    }
});

export { styles };
