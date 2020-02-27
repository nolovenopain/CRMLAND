import {StyleSheet} from 'react-native'

import { width, height } from '../../../elements/dimensions/dimensions';

const styles = StyleSheet.create ({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: width/1.2,
      height: height/5,
      marginBottom: 20
    },
    content: {
        fontSize: 14,
        lineHeight: 24,
        textAlign: 'center',
        height: height/6
    }
  });

  export {styles}