import { StyleSheet } from 'react-native'
import { width, height } from '../Dimensions/Dimensions';
import { blue } from '../Color/Color';

const styles = StyleSheet.create ({
   container: {
       justifyContent: 'center',
       width: width/1.2
   },
   checkboxWrapper: {
       flexDirection: 'row',
       alignItems: 'center'
   },
   checkbox: {
       
   },
   checkboxText: {
       marginLeft: 5,
       fontSize: 11
   },
   blue: {
       color: blue,
   }
});

export {styles}