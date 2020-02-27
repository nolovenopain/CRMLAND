import {StyleSheet} from 'react-native'

import { width, height } from '../../../elements/dimensions/dimensions';

const styles = StyleSheet.create ({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: width/1.2,
        height: height/5
      },
    footer: {
        fontSize: 14,
        lineHeight: 24,
        textAlign: 'center',
        color: "#666666",
        marginBottom: 20
      }
  });

  export {styles}