import { StyleSheet } from 'react-native';
import { width, height } from '../../../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../../../Components/Elements/Color/Color';

const SIZE = 40;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    themeList: {
        width: width,
        height: height - 150
    },
    list: {
        width: width,
        height: 70,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    top: {
        width: width/1.16,
    },
    bottom: {
        flexDirection: 'row'
    },
    themeName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        width: width/1.16,
        color: blue
    },
    bottom: {
        width: width/1.16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    free: {
        width: width/1.7
    },
    freeText: {
        color: 'gray',
        fontSize: 13
    },
    freeIcon: {
        flexDirection: 'row'
    },
    scrollToTop: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: 10,
        backgroundColor: orange,
        justifyContent: 'center',
        alignItems: 'center',
        top: height/1.45,
        left: width/1.15,
        opacity: 0.6
    },
    noHaveDomainTheme: {
        fontSize: 18,
        color: 'gray',
        marginTop: 50
    },
    itemLoader: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 30
    },
    categoryWrapper: {
        width: width/1.16,
        flexDirection: 'row',
        marginBottom: 20
    },
    leftCategory: {
        width: width/2.32,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightCategory: {
        width: width/2.32,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryTitle: {
        fontSize: 16
    }
})

export { styles }