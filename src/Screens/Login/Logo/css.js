import { StyleSheet } from "react-native";
import { width } from "../../../Components/Elements/Dimensions/Dimensions";

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo: {
        height: width / 1.4,
        width: width / 1.02
    }
});

export { styles };
