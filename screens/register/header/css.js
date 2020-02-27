import {StyleSheet} from 'react-native'

import {width, height} from '../../../elements/dimensions/dimensions'

const styles = StyleSheet.create ({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      marginLeft: -35,
      marginBottom: 30,
    },
    header: {
      flexDirection: 'row'
    },
    logo: {
      
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#0476bc",
      marginLeft: 15
    }
  });

  export {styles}