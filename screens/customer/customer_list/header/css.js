import {StyleSheet} from 'react-native'

import {width, height} from '../../../../elements/dimensions/dimensions'

const styles = StyleSheet.create ({
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    header: {
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        width: width,
        marginVertical: 25
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 15,
        color: '#3d3e40'
    }
  });

  export {styles}