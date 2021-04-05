import { StyleSheet } from 'react-native';
import { width, height } from '../../../Components/Elements/Dimensions/Dimensions';
import { blue, orange } from '../../../Components/Elements/Color/Color';

const SIZE = 40;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    searchBar: {
        backgroundColor: blue,
        marginBottom: 10,
        width: width/1.02,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    campaignList: {
        width: width,
        height: height - 210
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
    noHaveCampaign: {
        fontSize: 18,
        color: 'gray',
        marginTop: 50
    },
    itemLoader: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 30
    }
})

export { styles }