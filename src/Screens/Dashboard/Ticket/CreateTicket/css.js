import { StyleSheet } from 'react-native';
import { width, height } from '../../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../../Components/Elements/Color/Color';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: width/1.16,
        marginBottom: 20,
        marginTop: 30
    },
    bold: {
        fontWeight: 'bold'
    },
    title: {
        fontSize: 12,
        color: '#555555'
    },
    content: {
        fontSize: 12,
        color: '#686868',
        marginTop: 5
    },
    attach: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        width: width/1.16
    },
    attachText: {
        fontSize: 11,
        color: '#686868',
    },
    sendBtn: {
        marginBottom: 15
    },
    description: {
        width: width/1.16,
        marginBottom: 30
    },
    contentLabel: {
        fontSize: 12,
        color: '#686868'
    },
    picker: {
        width: width/1.16, 
        marginBottom: 10,
        justifyContent: 'center'
    },
    pickerLabel: {
        fontSize: 12,
        color: '#929caa',
    },
    cancelBtn: {
        marginBottom: 50
    },
    imageShow: {
        width: width/1.16,
        marginBottom: 30,
        flexDirection: 'row',
    },
    imageWrapper: {
        marginLeft: 5,
        width: 95,
        height: 80,
        marginTop: 10,
        marginBottom: 10
    },
    image: {
        width: 80,
        height: 80,
        position: 'relative'
    },
    modal: {
        height: height,
        width: width,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullImage: {
        width: width/1.16,
        height: height/1.5,
    },
    upload: {
        width: width/1.16,
        borderColor: 'silver',
        borderWidth: 0.5,
        alignItems: 'center',
        marginBottom: 50
    },
    uploadIcon: {
        marginTop: 10,
        marginBottom: 5
    },
    uploadText: {
        fontSize: 12,
        color: '#666666',
        marginBottom: 10
    },
    underline: {
        width: width/1.45,
        borderColor: 'silver',
        borderWidth: 0.5,
        marginBottom: 20
    },
    underlinePicker: {
        width: width/1.45,
        borderColor: 'silver',
        borderWidth: 0.5,
    },
    red: {
        color: 'red',
        fontSize: 10
    },
    total: {
        fontSize: 10,
        color: blue,
        fontWeight: 'bold'
    },
    listFileUpLoad: {
        marginBottom: 10
    },
    attachFile: {
        flexDirection: 'row',
        marginBottom: 5,
        width: width/1.16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    attachLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width/1.25 - 50,
    },
    fileName: {
        marginLeft: 10,
        fontSize: 11,
        color: '#929caa'
    },
    deleteFile: {
        width: 50,
        alignItems: 'flex-end',
    },
    imgIcon: {
        width: 20
    },
    imgName: {
        width: width/1.25 - 70
    },
    attachTextWrapper: {
        width: width/1.16 - 80,
    },
    totalWrapper: {
        width: 80,
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