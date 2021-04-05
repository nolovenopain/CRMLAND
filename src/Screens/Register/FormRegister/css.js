import { StyleSheet } from "react-native";
import {
  width,
  height
} from "../../../Components/Elements/Dimensions/Dimensions";

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        marginBottom: 5
    },
    tab: {
        flexDirection: "row",
        marginBottom: 30
    },
    titlePersonalActive: {
        borderBottomColor: "#5abebd",
        borderBottomWidth: 2.2,
        marginLeft: 20,
        width: width / 2.7,
        alignItems: "center"
    },
    titlePersonalInActive: {
        marginLeft: 20,
        width: width / 2.7,
        alignItems: "center"
    },
    titleBusinessActive: {
        borderBottomColor: "#5abebd",
        borderBottomWidth: 2.2,
        width: width / 2.2,
        marginLeft: 20,
        alignItems: "center"
    },
    titleBusinessInActive: {
        width: width / 2.2,
        marginLeft: 20,
        alignItems: "center"
    },
    titleActive: {
        fontSize: 13,
        color: "#5abebd",
        fontWeight: "bold",
        paddingBottom: 10
    },
    titleInActive: {
        fontSize: 13,
        color: "#000",
        paddingBottom: 10
    },
    form: {
        alignItems: 'center'
    }
});

export { styles };
