import {StyleSheet} from 'react-native'

import {width, height} from '../../../elements/dimensions/dimensions'

const styles = StyleSheet.create ({
    container: {
      justifyContent: 'center',
    },
    titleUnderline: {
      borderBottomColor: '#0476bc',
      borderBottomWidth: 2.5,
      marginBottom: 30,
      width: width/2.5,
      alignItems: 'center'
    },
    title: {
      fontSize: 18,
      color: '#0476bc',
      fontWeight: 'bold',
      paddingBottom: 10,
    },
    formInput: {
      marginBottom: 20
    },
    input: {
      marginBottom: 15
    }
  });

  export {styles}