import { StyleSheet } from 'react-native';
import { width, height } from '../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../Components/Elements/Color/Color';

const avatarWrapperSIZE = width/3;
const avatarSIZE = width/3 - 10;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'ghostwhite',
        width: width,
        marginBottom: 10
    },
    avatar: {
        width: avatarWrapperSIZE,
        height: avatarWrapperSIZE,
        borderRadius: avatarWrapperSIZE/2,
        borderWidth: 0.5,
        borderColor: 'silver',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    fullname: {
        fontSize: 20,
        color: blue,
        fontWeight: 'bold',
        marginBottom: 10
    },
    avatarImage: {
        width: avatarSIZE,
        height: avatarSIZE,
        borderRadius: avatarSIZE/2,
    },
    basicInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: width,
        marginBottom: 10
    },
    input: {
        width: width/1.16,
        marginBottom: 20,
    },
    title:{
        width: width/1.16,
        marginTop: 30,
        marginBottom: 30
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    otherInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: width,
        marginBottom: 10
    },
    update: {
        height: 100,
        backgroundColor: '#fff',
        marginBottom: 50,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBackground: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        height: height,
    },
    modalPicker: {
        height: 160,
        width: width/1.1,
        top: height/1.4
    },
    imgPicker: {
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancel: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    takePhoto: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: width/1.1,
    },
    libraryPhoto: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: width/1.1,
    }
});

export { styles };