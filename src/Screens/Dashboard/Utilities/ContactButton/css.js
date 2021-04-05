import { StyleSheet } from 'react-native';
import { width, height } from '../../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../../Components/Elements/Color/Color';

const SIZE = 40;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10
    },
    popupButtonList: {
        width: width,
        height: height - 150,
    },
    scrollToTop: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: 10,
        backgroundColor: orange,
        justifyContent: 'center',
        alignItems: 'center',
        top: height/1.55,
        left: width/1.15,
        opacity: 0.6
    },
    noHavePopup: {
        fontSize: 18,
        color: 'gray',
        marginTop: 50
    },
    list: {
        width: width,
        backgroundColor: '#fff',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 15
    },
    iconWrapper: {
        width: 100,
        alignItems: 'center'
    },
    bundle: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE/2,
        backgroundColor: blue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: width - 100,
    },
    popupName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555555',
        marginBottom: 15
    },
    contentBottom: {
        flexDirection: 'row'
    },
    createDate: {
        fontSize: 10,
        color: '#666666'
    },
    delete: {
        marginLeft: width/5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    deleteLabel: {
        fontSize: 10,
        marginLeft: 5,
    },
    bold: {
        fontWeight: 'bold'
    },
    bold2: {
        fontWeight: 'bold',
        fontSize: 11,
        color: '#333333'
    },
    rowTitle: {
        flexDirection: 'row',
        width: width/1.16,
        height: 40,
        alignItems: 'center',
        borderColor: 'silver',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        marginBottom: 10,
    },
    linkAndAction: {
        flexDirection: 'row',
        width: width/1.16,
        marginBottom: 20
    },
    bold3: {
        fontWeight: 'bold',
        fontSize: 11,
    },
    linkTitle: {
        width: width/1.6
    },
    link: {
        width: width/1.7,
        justifyContent: 'center'
    },
    linkRow: {
        flexDirection: 'row',
        width: width/1.16,
        marginBottom: 30,
    },
    deleteIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    linkText: {
        fontSize: 11,
        color: '#666666'
    },
    btnGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switch: {
        marginLeft: 10
    },
    itemLoader: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 30
    },
})

export { styles }