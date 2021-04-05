import { StyleSheet } from "react-native";

import { width } from "../Dimensions/Dimensions";

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",        
    },
    searchBar: {
        width: width / 1.15,
        height: 40,
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#fff'
    },
    input: {
        fontSize: 13,
        paddingLeft: 10,
        width: width/1.45
    },
    icon: {
        paddingLeft: 20,
    },
    btnDelete: {
        marginLeft: width/1.25,
        position: 'absolute'
    }
});

export { styles };
