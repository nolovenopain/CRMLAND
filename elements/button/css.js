import {StyleSheet} from 'react-native'

import { width, height } from '../dimensions/dimensions';

const styles = StyleSheet.create ({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonWrapped: {
      width: width/1.2,
      height: height/10,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18
    }
  });

  export {styles}