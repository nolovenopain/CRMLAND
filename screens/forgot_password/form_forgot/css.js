import {StyleSheet} from 'react-native'

import{width, height} from '../../../elements/dimensions/dimensions'

const styles = StyleSheet.create ({
    container: {
      flex: 2,
      marginBottom: 40,
    },
    title: {
      fontFamily: "Muli",
      fontSize: 25,
      fontWeight: "bold",
      fontStyle: "normal",
      color: "#0476bc",
      marginBottom: 25,
      marginLeft: 20
    },
    account: {
      marginBottom: 20
    }
  });

  export {styles}