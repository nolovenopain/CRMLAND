import { StyleSheet } from 'react-native';
import { width } from '../../../Components/Elements/Dimensions/Dimensions';
import { blue } from '../../../Components/Elements/Color/Color';

const SIZE = 40;
const styles = StyleSheet.create ({
    list: {
        width: width,  
        alignItems: 'center'   
    },
    top: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
    },
    circle: {
        backgroundColor: blue,
        borderRadius: SIZE/2,
        width: SIZE,
        height: SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleWrapper: {
        width: SIZE + 20,
        alignItems: 'center'
    },
    pronoun: {
        color: '#fff',
        fontSize: 11
    },
    nameAndPhone: {   
        width: width - 100
    },
    name: {
        fontSize: 13,
        marginBottom: 5,
        marginLeft: 20,
    },
    phone: {
        color: '#888888',
        fontSize: 11,
        marginLeft: 20,
    },
    dropdown: {
        width: 20
    },
    bottom: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    textConfig: {    
        fontSize: 10,
        color: '#888888'
    },
    fistItem: {
        // marginLeft: width/10,
    },
    items: {
        alignItems: 'center',
        marginLeft: width/10,
    },
    iconConfigs: {
        fontSize: 18,
        color: '#a8a8a8',
        marginBottom: 5
    },
    underlineWrapper: {
        
    },  
    underline: {
        borderBottomWidth: 0.3,
        borderBottomColor: 'silver',
        width: width/1.37,
        marginLeft: width/7
    },
});

  export {styles}