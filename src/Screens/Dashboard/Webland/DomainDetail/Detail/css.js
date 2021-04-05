import { StyleSheet } from 'react-native';
import { width } from '../../../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../../../Components/Elements/Color/Color';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'silver',
    },
    contentTextWrapper: {
        width: width/1.16 - 150
    },
    contentAmountWrapper: {
        width: 150,
        alignItems: 'flex-end',
    },
    contentText: {
        fontSize: 12
    },
    contentAmount: {
        fontSize: 13,
        color: blue,
        fontWeight: 'bold'
    },
    detailWrapper: {
        width: width/1.16
    }
})

export { styles }