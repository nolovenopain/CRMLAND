import { StyleSheet } from 'react-native';
import { width, height } from '../../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../../Components/Elements/Color/Color';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    header: {
        width: width,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    name: {
        width: width/1.16,
        marginBottom: 40,
        marginTop: 15
    },
    info: {
        width: width/1.16,
        marginBottom: 20,
    },
    ticketName: {
        color: blue,
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 10
    },
    comment: {
        width: width,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    commentTitle: {
        width: width/1.16,
        height: 30,
        justifyContent: 'center',
        borderBottomColor: 'silver',
        borderBottomWidth: 0.5,
        marginBottom: 5,
        marginTop: 5
    },
    commentContent: {
        width: width/1.16,
        marginBottom: 25
    },
    bold: {
        fontWeight: 'bold'
    },
    title: {
        fontSize: 12,
        color: '#555555',
    },
    content: {
        fontSize: 12,
        color: '#686868',
        marginTop: 5
    },
    reply: {
        width: width,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 30
    },
    replyContent: {
        width: width/1.16,
        marginBottom: 30,
        marginTop: 15
    },
    replyTitle: {
        marginBottom: 30
    },
    attach: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: width/1.16
    },
    attachText: {
        fontSize: 12,
        color: '#686868',
    },
    sendBtn: {
        marginBottom: 15
    },
    cancelBtn: {
        marginBottom: 30
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
    imageShow: {
        width: width/1.16,
        marginBottom: 30,
        flexDirection: 'row',
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
    imgAttached: {
        width: width/1.16,
        marginBottom: 20
    },
    imgAttachedLabel: {
        flexDirection: 'row',
        marginBottom: 15
    },
    label: {
        fontSize: 12,
        color: '#929caa',
        marginLeft: 5,
        marginBottom: 10
    },
    showImg: {
        width: width/1.16,
    },
    showImgAttached: {
        width: 80,
        height: 80,
    },
    showImgAttachedWrapper: {
        width: width/1.16,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    oldContent: {
        width: width/1.16,
    },
    attachFile: {
        width: width/1.16,
        marginBottom: 15,
    },
    attachNewFile: {
        flexDirection: 'row',
        marginBottom: 5,
        width: width/1.16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noHaveComment: {
        fontSize: 18,
        color: 'gray',
    },
    oldContent: {
        marginBottom: 15,
        backgroundColor: '#ebedf2',
        width: width/1.16,
        minHeight: 50,
        borderRadius: 10
    },
    attImgName: {
        fontSize: 11,
        color: 'gray',
        marginLeft: 5
    },
    attImgNameWrapper: {
        width: width/1.16 - 35,
    },
    listFileUpLoad: {
        marginBottom: 10
    },
    attachLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width/1.25 - 50,
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
    fileName: {
        marginLeft: 10,
        fontSize: 11,
        color: '#929caa'
    },
    deleteFile: {
        width: 50,
        alignItems: 'flex-end',
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
    },
    underlinePicker: {
        width: width/1.45,
        borderColor: 'silver',
        borderWidth: 0.5,
    },
    cancel: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export { styles };