import { StyleSheet } from "react-native";
import {
  width,
  height
} from "../../../Components/Elements/Dimensions/Dimensions";

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        alignItems: "center",
        width: width / 1.15,
    },
    footer: {
        fontSize: 14,
        textAlign: "center",
        color: "#666666",
    }
});

export { styles };
