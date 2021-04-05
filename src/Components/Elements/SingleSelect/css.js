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
        alignItems: 'center',
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
        borderRadius: 7,
        maxHeight: 350
    },
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: height
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
        fontSize: 15,
        color: 'gray'
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
    noHaveList: {
        width: width/1.16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancel: {
        backgroundColor: orange,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7
    },
    cancelText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }
});

export { styles };