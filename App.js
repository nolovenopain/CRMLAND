import React, { Component } from 'react';

import Login from './screens/login/index';
import UserPaner from './screens/user_paner/index';
import ForgotPassword from './screens/forgot_password/index';
import Register from './screens/register/index';
import CustomerList from './screens/customer/customer_list/index';

import UserNavigator from './navigaton/user_navigator'

export default class App extends Component {

  render() {
    return(
      // <NavigationContainer>
      //   <Stack.Navigator>
      //     <Stack.Screen
      //       name="Home"
      //       component={UserPaner}
      //     />
      //     <Stack.Screen name="Login" component={Login} />
      //     <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      //   </Stack.Navigator>
      // </NavigationContainer>

      <CustomerList/>
    );
  }
}
