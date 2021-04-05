import { StyleSheet } from 'react-native';
import { width, height } from '../Dimensions/Dimensions';
import { blue, orange } from '../Color/Color';

const styles = StyleSheet.create({
    container: {
        
    },
    wrapper: {
        width: width/1.16,
        height: 50,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        justifyContent: 'center',
        marginBottom: 15,
        flexDirection: 'row'
    },
    left: {
        width: width/1.16 - 30,
        justifyContent: 'center'
    },
    right: {
        width: 30,
        justifyContent: 'center'
    },
    selectText: {
        fontSize: 12,
    },
    iconDown: {

    },
    modal: {
        width: width/1.16,
        backgroundColor: '#fff',
        maxHeight: 500,
        borderRadius: 7,
    },
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: height,
    },
    search: {
        height: 50,
        backgroundColor: '#f8f8f8',
        width: width/1.16,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    iconSearch: {
        marginLeft: 10
    },
    itemList: {
        width: width/1.3,
    },
    buttonGroup: {
        flexDirection: 'row'
    },
    confirm: {
        width: width/2.32,
        height: 50,
        backgroundColor: blue,
        borderBottomLeftRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancel: {
        width: width/2.32,
        height: 50,
        backgroundColor: orange,
        borderBottomRightRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 15,
    },
    input: {
        fontSize: 13,
        paddingLeft: 10,
        width: width/1.45
    },
    itemRow: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    itemTitle: {
        color: 'gray',
        fontSize: 15
    },
    iconCheckWrapper: {
        width: width/1.3,
        position: 'absolute',
        alignItems: 'flex-end'
    },
    showItems: {
        flexDirection: 'row',
        width: width/1.16,
        flexWrap: 'wrap'
    },
    item: {
        height: 40,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        marginLeft: 5,
        flexDirection: 'row'
    },
    label: {
        fontSize: 14,
        color: 'gray',
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 20
    },
    deleteItem: {
        marginLeft: 7
    },
    deleteAll: {
        height: 40,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: orange,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        marginLeft: 5,
    },
});

export { styles };