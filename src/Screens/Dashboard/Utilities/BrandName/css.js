import { StyleSheet } from  'react-native';
import { width, height } from '../../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../../Components/Elements/Color/Color';

const SIZE = 40;

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
    },
    searchBar: {
        marginBottom: 10,
        backgroundColor: blue,
        width: width/1.02,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    brandNameList: {
        width: width,
        alignItems: 'center',
        height: height - 260,
    },
    itemLoader: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 30
    },
    scrollToTop: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: 10,
        backgroundColor: orange,
        justifyContent: 'center',
        alignItems: 'center',
        top: height/1.42,
        left: width/1.15,
        opacity: 0.6
    },
    create: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: 10,
        backgroundColor: blue,
        justifyContent: 'center',
        alignItems: 'center',
        top: height/1.42 - 50,
        left: width/1.15,
        opacity: 0.6
    },
    item: {
        flexDirection: 'row',
        width: width,
        borderBottomColor: 'silver',
        borderBottomWidth: 0.8
    },
    noHaveBrandName: {
        fontSize: 18,
        color: 'gray',
        marginTop: 80,
    },
    titleWrapper: {
        flexDirection: 'row',
        width: width,
        backgroundColor: orange
    },
    left: {
        width : 50,
        alignItems: 'center',
        marginVertical: 10
    },
    right: {
        width: 120,
        alignItems: 'center',
        marginVertical: 10
    },
    center: {
        width: width - 170,
        alignItems: 'center',
        marginVertical: 10
    },
    label: {
        fontWeight: 'bold'
    },
    text: {
        fontSize: 14
    },
    textStatus: {
        fontSize: 14,
        color: blue
    }
});

export {styles}