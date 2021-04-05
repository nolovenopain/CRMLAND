import { StyleSheet } from 'react-native';
import { width, height } from '../../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../../Components/Elements/Color/Color';

const SIZE = 40;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    backupList: {
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
        top: height/1.45,
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
        top: height/1.45 - 50,
        left: width/1.15,
        opacity: 0.6
    },
    noHaveBackup: {
        fontSize: 18,
        color: 'gray',
        marginTop: 50
    },
    list: {
        width: width,
        height: 70,
        backgroundColor: '#fff',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 7,
    },
    title: {
        width: width - 160,
    },
    backupName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: blue,
        marginBottom: 7,
    },
    btnGroups: {
        width: 80
    },
    backup: {
        width: 80,
        height: 20,
        backgroundColor: blue,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    delete: {
        width: 80,
        height: 20,
        backgroundColor: orange,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backupText: {
        fontSize: 11,
        color: '#fff',
        marginLeft: 5
    },
    deleteText: {
        fontSize: 11,
        color: '#fff',
        marginLeft: 10
    },
    icon: {
        width: 70,
        alignItems: 'center'
    }
})

export { styles }