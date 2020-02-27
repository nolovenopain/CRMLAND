import {StyleSheet} from 'react-native'

import { width, height } from '../dimensions/dimensions';

const styles = StyleSheet.create ({
   container: {
       justifyContent: 'center',
       alignItems: 'center',
   },
   input: {
       width: width/1.2,
       borderBottomWidth: 1,
       borderBottomColor: 'silver',
   },
   label: {
       color: 'grey'
   },
   required: {
       flexDirection: 'row',
   },
   requiredColor: {
       color: 'red',
       fontWeight: 'bold',
       marginLeft: 5,
   }
});

export {styles}