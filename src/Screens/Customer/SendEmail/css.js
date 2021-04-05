import { StyleSheet } from 'react-native';
import { width, height } from '../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../Components/Elements/Color/Color';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: width/1.16,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        marginBottom: 30,
    },
    emailSenderWrapper: {
        width: width/1.2,
        flexDirection: 'row',
        marginBottom: 30,
    },
    emailSender: {
        width: width/1.8,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',    
    },
    nameSender: {
        width: width/1.2,
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
        marginBottom: 30
    },
    domainNameWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'silver',
        width: width/1.2 - width/1.8,
        backgroundColor: 'whitesmoke'
    },
    domainName: {
        fontSize: 12
    },
    customInput: {
        marginBottom: 20,
        width: width/1.16,
    },
    inputContent: {
        marginBottom: 40,
        width: width/1.16,
    },
    uploadFileWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: width/1.16,
    },
    uploadFile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    uploadText: {
        marginLeft: 10,
        fontSize: 12,
        color: '#666666'
    },
    total: {
        fontSize: 11,
        color: blue,
        marginLeft: width/25
    },
    picker: {
        width: width/1.16,
        marginBottom: 10,
        position: 'relative',
    },
    label: {
        fontSize: 12,
        color: '#929caa'
    },
    attachFile: {
        flexDirection: 'row',
        marginBottom: 5,
        width: width/1.16,
        alignItems: 'center',
    },
    fileName: {
        marginLeft: 10,
        fontSize: 11,
        color: '#929caa'
    },
    sendBtn: {
        marginTop: 30,
        marginBottom: 50
    },
    deleteFile: {
        width: 30,
        alignItems: 'center',
    },
    red: {
        color: 'red',
        fontSize: 11
    },
    attachLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width/1.25,
    },
    addEmailBtn: {
        width: 100,
        height: 25,
        backgroundColor: blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    addEmailLabel: {
        color: '#fff'
    },
    addEmailWrapper: {
        width: width/1.2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 20,
        marginBottom: 10
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,  
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: width/1.05
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    title: {
        marginBottom: 30
    },
    btnGroup: {
        width: width/1.16,
        flexDirection: 'row'
    },
    createEmailWrapper: {
        width: width/1.6,
        alignItems: 'flex-end'
    },
    createEmailBtn: {
        width: width/4,
        height: 30,
        backgroundColor: blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    createEmailLabel: {
        color: '#fff'
    },
    cancelBtn: {
        width: width/5,
        backgroundColor: orange,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        borderRadius: 5,
        marginLeft: 10
    },
    cancelLabel: {
        color: '#fff'
    },
    multiPicker: {
        marginBottom: 30,
        width: width/1.16,
    },
    labelSendTo: {
        fontSize: 12,
        color: '#929caa',
        marginBottom: 10
    },
});

export { styles };