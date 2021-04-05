import { StyleSheet } from "react-native";

import {
  width,
  height
} from "../../../Components/Elements/Dimensions/Dimensions";

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: width / 1.2,
    },
    content: {
        fontSize: 14,
        lineHeight: 26,
        textAlign: "center",
    }
});

export { styles };
