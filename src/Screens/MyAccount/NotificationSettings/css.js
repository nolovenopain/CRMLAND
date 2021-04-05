import { StyleSheet } from 'react-native';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10
    },
    settingWrapper: {
        width: width,
        backgroundColor: '#fff',
        marginBottom: 10,
        paddingVertical: 20,
        alignItems: 'center'
    },
    setting: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width/1.16,
        borderBottomColor: 'silver',
        borderBottomWidth: 0.5,
        marginBottom: 20
    },
    settingText: {
        paddingHorizontal: 20,
    },
    topSettingText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 5
    },
    bottomSettingText: {
        fontSize: 10,
        color: 'gray',
        marginBottom: 15
    },
    onOffText: {
        fontSize: 10
    },
    onOff: {
        alignItems: 'center'
    },
    switch: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
    },
    row: {
        flexDirection: 'row',
        width: width/1.16,
        marginBottom: 20
    },
    notiSetting: {
       
    },
    switchLabelWrapper: {
        marginBottom: 10,
        width: width/1.3
    },
    switchLabelTop: {
        fontWeight: 'bold',
        fontSize: 12
    },
    switchLabelBottom: {
        fontSize: 12
    }
});

export { styles };