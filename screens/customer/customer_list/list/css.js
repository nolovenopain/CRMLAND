import {StyleSheet} from 'react-native'

import {width, height} from '../../../../elements/dimensions/dimensions'

const styles = StyleSheet.create ({
    container: {
      flex: 1,
      width: width/1.2,
    },
    top: {
        flexDirection: 'row',
        marginBottom: 50,
        alignItems: 'center'
    },
    circle: {
        backgroundColor: '#0476bc',
        borderRadius: 100/2,
        width: width/6,
        height: height/10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff'
    },
    nameAndPhone: {   
        marginLeft: 20,
    },
    name: {
        fontSize: 18,
        marginBottom: 3
    },
    phone: {
        color: '#888888',
    },
    dropdown: {
        paddingLeft: 20,
        flexDirection: 'row'
    },
    bottom: {
        flexDirection: 'row',
    },
    firstConfig: {
        marginLeft: 25,
        fontSize: 13
    },
    otherConfig: {
        marginLeft: 25,
        fontSize: 13
    }
  });

  export {styles}