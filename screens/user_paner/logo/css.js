import {StyleSheet} from 'react-native'

import { width, height } from '../../../elements/dimensions/dimensions';

const styles = StyleSheet.create ({
    container: {
      marginTop: 10,
      marginBottom: 20
    },
    logo: {
      height: width / (1.1 * 1.5),
      width: width/1.02,  
    }
  });

  export {styles}