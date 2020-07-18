import * as React from 'react';
import { Text, View, StyleSheet, Image, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
export default function DocViewer(props) {
  // alert(Object.getOwnPropertyNames(props))
  console.log(props.navigation, props.route.params)
  return (
    <WebView source={{ uri: props.route.params }} />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  }
});
