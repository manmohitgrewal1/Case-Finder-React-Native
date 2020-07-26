import * as React from 'react';
import { Text, View, StyleSheet, Image, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
export default function DocViewer(props) {
  return (
    <WebView source={{ uri: props.route.params }} />
  );
}
