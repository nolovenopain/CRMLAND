import { StyleSheet } from 'react-native'
import { width } from '../Dimensions/Dimensions';

const styles = StyleSheet.create ({
   container: {
        justifyContent: 'center',
   },
   input: {
        position: 'relative',
        justifyContent: 'center'
   },
   inputText: { 
        fontSize: 12,
        color: '#000',
        marginTop: 5,
   },
   btnDelete: {
        position: 'absolute',
   },
   btnEye: {
       position: 'absolute',
       marginLeft: width/1.27,
       marginTop: 20,
       alignItems: 'center',  
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