import React from 'react'
import {ModalPortal} from 'react-native-modals'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import firebase from 'firebase/app'
import 'firebase/auth'
import { theme } from './src/core/theme'
import {
  AuthLoadingScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from './src/screens'
import { FIREBASE_CONFIG } from './src/core/config'
import {LogBox, YellowBox } from 'react-native';
import _ from 'lodash';
LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['[Unhandled promise rejection: Error: Attempt to invoke interface method \'java.util.Map l.d.c.j.d.getOptions()\' on a null object reference]']);
LogBox.ignoreLogs(['Unhandled promise rejection: Error: Background']);
LogBox.ignoreLogs(['Unhandled promise rejection: Error: Background Location has not been configured. To enable it, add `location` to `UIBackgroundModes` in Info.plist file.'])
LogBox.ignoreLogs(['[Unhandled promise rejection: Error: Background Location has not been configured. To enable it, add `location` to `UIBackgroundModes` in Info.plist file.]'])
LogBox.ignoreAllLogs(['[Unhandled promise rejection: Error: Background Location has not been configured. To enable it, add `location` to `UIBackgroundModes` in Info.plist file.]']);
const Stack = createStackNavigator()
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}
const App = () => {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AuthLoadingScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="AuthLoadingScreen"
            component={AuthLoadingScreen}
          />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <ModalPortal/>
    </Provider>
  )
}

export default App
