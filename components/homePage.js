import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  Button,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RadioButton } from "react-native-paper";

import { WebView } from "react-native-webview";
import * as Animatable from "react-native-animatable";
export default function Front(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={styles.title}></Text>
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: "#ea5a78",
          },
        ]}
        animation="fadeInUpBig"
      >
        <Text
          style={{
            fontSize: 30,
            marginBottom: 20,
            fontFamily: "Inter_800ExtraBold",
          }}
        >
          About Us
        </Text>
        <Text
          style={[
            styles.title,
            {
              color: "white",
            },
          ]}
        >
          Case finder is the ultimate legal reasearch tool developed for legal
          fraternity. User have access to judgements of the Supreme Court and
          all the High Courts. It is super easy to use and its powerful software
          dispence result based on the relavancy of the searched case.
        </Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
            <Text style={styles.textSign}>Get Started</Text>
            <MaterialIcons name="navigate-next" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9d7ff4",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    textAlign: "justify",
    fontSize: 15,
    fontFamily: "Inter_200ExtraLight",
  },
  textSign: {
    position: "relative",
    top: 18,
    left: 20,
    color: "black",
    fontWeight: "bold",
  },
});
