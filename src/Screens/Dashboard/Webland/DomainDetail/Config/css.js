import { StyleSheet } from 'react-native'
import { width } from '../../../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../../../Components/Elements/Color/Color';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: blue,
        width: width
    },
    configWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 30,
        marginBottom: 20
    },
    // left: {
    //     width: width/3,
    //     alignItems: 'center',
    // },
    // center: {
    //     width: width/3,
    //     alignItems: 'center'
    // },
    // right: {
    //     width: width/3,
    //     alignItems: 'center'
    // },
    config: {
        width: width/4,
        alignItems: 'center'
    },
    // iconLeft: {
    //     marginBottom: 5
    // },
    // iconCenter: {
    //     marginBottom: 5
    // },
    // iconRight: {
    //     marginBottom: 5
    // },
    icon: {
        marginBottom: 10
    },
    iconLeftWrapper: {
        width: width/4,
        alignItems: 'center',
        marginBottom: 20
    },
    iconCenterWrapper: {
        width: width/4,
        alignItems: 'center',
        marginBottom: 20
    },
    pause: {
        alignItems: 'center'
    },
    play: {
        alignItems: 'center'
    },
    iconRightWrapper: {
        width: width/4,
        alignItems: 'center',
        marginBottom: 20
    },
    label: {
        color: '#fff',
        fontSize: 10
    }
})

export {styles}