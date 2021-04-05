import { StyleSheet } from 'react-native';
import { width } from '../../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../../Components/Elements/Color/Color';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    projectName: {
        width: width/1.16,
        marginBottom: 20,
        marginTop: 30
    },
    projectNameLabel: {
        color: '#929caa',
        fontSize: 12
    },
    projectDescription: {
        width: width/1.16,
        marginBottom: 30,
    },
    projectDescriptionLabel: {
        color: '#929caa',
        fontSize: 12
    },
    totalFilesSize: {
        width: width/1.16,
        marginBottom: 10,
        alignItems: 'flex-end'
    },
    uploadProjectContract: {
        width: width/1.16,
        marginBottom: 50
    },
    uploadProjectDesign: {
        width: width/1.16,
        marginBottom: 50
    },
    uploadMarketing: {
        width: width/1.16,
        marginBottom: 50
    },
    label: {
        color: '#929caa',
        fontSize: 12,
    },
    upload: {
        width: width/1.16,
        borderColor: 'silver',
        borderWidth: 0.5,
        alignItems: 'center'
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
    buttonCreate: {
        marginBottom: 50
    },
    red: {
        color: 'red',
        fontSize: 11,
        fontWeight: 'normal'
    },
    total: {
        color: blue,
        fontSize: 12,
        fontWeight: 'bold'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    attachFile: {
        flexDirection: 'row',
        marginBottom: 5,
        width: width/1.16,
        alignItems: 'center',
        justifyContent: 'center'
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
    attachLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width/1.25 - 50,
    },
    listFileUpLoad: {
        marginBottom: 10
    },
    left: {
        width: width/1.16 - 90
    },
    right: {
        width: 90,
    }
})

export {styles}