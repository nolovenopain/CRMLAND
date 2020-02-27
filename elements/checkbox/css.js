import {StyleSheet} from 'react-native'

import { width, height } from '../dimensions/dimensions';

const styles = StyleSheet.create ({
   container: {
       justifyContent: 'center',
       width: width/1.2
   },
   checkboxWrapper: {
       flexDirection: 'row'
   },
   checkbox: {
       
   },
   checkboxText: {
       marginTop: 5
   },
   blue: {
       color: '#0476bc',
   }
});

export {styles}