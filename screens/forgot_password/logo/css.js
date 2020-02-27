import {StyleSheet} from 'react-native'

import { width, height } from '../../../elements/dimensions/dimensions';

const styles = StyleSheet.create ({
    container: {
      flex: 2,
      marginBottom: 15
    },
    logo: {
      height: width / (0.9 * 1.5),
      width: width/1.02,
    }
  });

  export {styles}