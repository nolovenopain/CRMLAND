import { StyleSheet } from 'react-native'
import { width } from '../Dimensions/Dimensions';

const styles = StyleSheet.create ({
   container: {
        justifyContent: 'center',
        width: width/1.16
   },
   input: {
        justifyContent: 'center',
        width: width/1.16,
        flexDirection: 'row',
        backgroundColor: '#ebedf2',
        borderRadius: 10,
   },
   icon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        // borderWidth: 1
   },
   inputText: { 
        fontSize: 12,
        color: '#000',
        // borderWidth: 1
   },
   btnGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1
   },
   btnDelete: {
        alignItems: 'center',  
   },
   btnEye: {
        alignItems: 'center',
        marginLeft: 10  
   },
   label: {
       color: 'grey',
   },
   required: {
       color: 'red',
       fontWeight: 'bold',
   },
});

export { styles }