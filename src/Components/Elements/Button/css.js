import { StyleSheet } from "react-native";
import { width, height } from "../Dimensions/Dimensions";

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    buttonWrapped: {
        width: width / 1.16,
        height: 50,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 14
    }
});

export { styles };
