import {StyleSheet} from 'react-native'

import { width, height } from '../dimensions/dimensions';

const styles = StyleSheet.create ({
   container: {
       justifyContent: 'center',
       alignItems: 'center',
   },
   searchBar: {
       borderColor: '#a8a8a8',
       borderWidth: 1,
       width: width/1.15,
       height: height/ 12,
       borderRadius: 25,
       justifyContent: 'center'
   },
   input: {
       fontSize: 16,
       paddingLeft: 40,
   }
});

export {styles}