import * as React from "react";
import {
  Text,
  View,
  WebView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import DocViewer from "./components/docViewer";
import Front from "./components/homePage";
import CaseFinderCore from "./components/caseFinderCore";

import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import {
  NavigationContainer,
  DefaultTheme,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  DarkTheme,
  DrawerActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const cheerio = require("react-native-cheerio");
const Stack = createStackNavigator();
export default class App extends React.Component {
  createHomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Front"
        component={Front}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={CaseFinderCore}
      />
      <Stack.Screen name="DocViewer" component={DocViewer} />
    </Stack.Navigator>
  );
  render() {
    return <NavigationContainer>{this.createHomeStack()}</NavigationContainer>;
  }
}
