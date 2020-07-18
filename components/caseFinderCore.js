import * as React from "react";
import {
  Text,
  View,
  WebView,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
const cheerio = require("react-native-cheerio");
import * as Animatable from "react-native-animatable";

class Casetiles extends React.Component {
  titleStyle = () => {
    // console.log(console.log(this.props.li[1].split(" ")[2]))
    return {
      backgroundColor: "#7941f2",
      margin: 10,
      borderRadius: 20,
      position: "relative",
      width: "85%",
      height: 130,
      shadowColor: "#c32fb1",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.9,
      shadowRadius: 5,
    };
  };

  render() {
    return (
      <Animatable.View animation="slideInLeft" style={this.titleStyle()}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigate.navigate(
              "DocViewer",
              this.props.docHref[this.props.id]
            )
          }
        >
          <View style={styles.title_innerContainer}>
            <View style={styles.title_casename}>
              <Text style={styles.title_casenameText}>
                {this.props.li[0].split(" vs ")[0]} {"\n"}VS{"\n"}{" "}
                {this.props.li[0].split(" vs ")[1]}
              </Text>
            </View>
            <View style={styles.title_year}>
              <Text style={styles.title_yearText}>
                {this.props.li[1].split(" ")[2]}
              </Text>
            </View>

            <View style={styles.title_cited}>
              <Text style={styles.title_citedText1}>CITES</Text>
              <Text style={styles.title_citedText2}>{this.props.cities}</Text>
            </View>

            <View style={styles.title_citedBy}>
              <Text style={styles.title_citedByText1}>CITED BY</Text>
              <Text style={styles.title_citedByText2}>
                {this.props.citiedBy}
              </Text>
            </View>

            <View style={styles.title_autho}>
              <Text style={styles.title_authoText1}>AUTHORITY</Text>
              <Text style={styles.title_authoText2}>{this.props.court}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}

export default class CaseFinderCore extends React.Component {
  constructor() {
    super();
    this.state = {
      message: [],
      court: [],
      cities: [],
      citiedBy: [],
      docHref: [],
      loadCheck: false,
    };
  }

  somefunction() {
    const arr2 = this.loadGraphicCards("hey yo");
    return arr2;
  }
  myTrim(x) {
    return x.replace(/^\s+|\s+$/gm, "");
  }
  async componentDidMount(casename) {
    console.log("Loaded Sucessfully");
    if (this.state.loadCheck === false && !casename) {
      return;
    } else if (casename) {
      // alert("Hellko")
      const searchUrl = `https://indiankanoon.org/search/?formInput=${casename}+doctypes:judgments`;
      console.log(searchUrl);
      const response = await fetch(searchUrl); // fetch page
      const htmlString = await response.text(); // get response text
      const $ = cheerio.load(htmlString); // parse HTML string
      const case_title = $(".result_title"); // select result <li>s
      const cases = this.myTrim(case_title.text());
      var array = cases.split(/\r?\n/);
      const data = [];
      array.map((ele) => data.push(ele.split(" on ")));
      const case_details = $(".docsource");
      const length_case_detail = [];
      const courts = [];
      case_details.map((some) => length_case_detail.push(some));
      for (let i = 0; i < length_case_detail.length; i++) {
        courts.push(case_details[i].children[0].data);
      }
      let string;
      const docHref = [];
      for (let i = 0; i < length_case_detail.length; i++) {
        string = case_title[i].children[0].next.attribs.href;
        string = string.split("/");
        docHref.push("https://indiankanoon.org/doc/" + string[2] + "/");
      }
      const citiTag = $(".cite_tag");
      const length_citiTag = [];
      const citis = [];
      const citiedBy = [];
      let num;
      citiTag.map((some) => length_citiTag.push(some));
      for (let i = 0; i < length_citiTag.length; i++) {
        if (i % 3 == 0) {
          num = citiTag[i].children[0].data.match(/\d/g);
          citis.push(num.join(""));
          num = citiTag[i + 1].children[0].data.match(/\d/g);
          citiedBy.push(num.join(""));
        } else {
          continue;
        }
      }
      this.setState({
        cities: citis,
        citiedBy: citiedBy,
        message: data,
        court: courts,
        docHref: docHref,
      });
    }
  }
  headerChecker = (bool) => {
    if (bool === true) {
      return {};
    } else if (bool === false) {
      return {
        width: "100%",
        height: 160,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: "absolute",
      };
    }
  };

  render() {
    return (
      <ScrollView>
        <StatusBar hidden={true} />
        <View>
          <Image
            source={require("../assets/headerFluid.png")}
            style={
              this.state.loadCheck ? styles.headerImg : styles.headerImgLong
            }
          />

          <Image
            source={require("../assets/logo.png")}
            style={this.state.loadCheck ? styles.logo : styles.logoLong}
          />
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Next Update Info",
                "To enhance the search result developers are working on filters. Users could narrow down the search with the help of new filters. Update will release soon."
              )
            }
            style={styles.info}
          >
            <Octicons
              name="info"
              size={24}
              color="black"
              style={styles.icon2}
            />
          </TouchableOpacity>
          {this.state.loadCheck ? (
            <Text></Text>
          ) : (
            <Text style={styles.welcomeText}>
              Welcome {"\n"} Lets get searching!
            </Text>
          )}
          <Octicons
            name="search"
            size={18}
            color="black"
            style={this.state.loadCheck ? styles.icon : styles.iconLong}
          />

          <TextInput
            placeholder="Search Case"
            placeholderTextColor="white"
            onSubmitEditing={(text) => {
              this.componentDidMount(text.nativeEvent.text);
              this.setState({ loadCheck: true });
            }}
            style={this.state.loadCheck ? styles.input : styles.inputLong}
          />
        </View>
        {this.state.loadCheck ? (
          <Text></Text>
        ) : (
          <View style={styles.tmpView}>
            <Image
              source={require("../assets/home_freetrial.png")}
              style={styles.tmpImg}
            />
            <View
              style={{
                position: "relative",
                width: 200,
                left: "55%",
                bottom: "45%",
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: "100", color: "white" }}>
                Try it now!
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                  paddingTop: 10,
                }}
              >
                Free acess for limited time only.
              </Text>
            </View>
          </View>
        )}
        {this.state.message.map((msg, index) => (
          <View style={styles.tile_container}>
            <Casetiles
              id={index}
              li={msg}
              court={this.state.court[index]}
              cities={this.state.cities[index]}
              citiedBy={this.state.citiedBy[index]}
              docHref={this.state.docHref}
              navigate={this.props.navigation}
            />
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tmpView: {
    height: 150,
    width: "100%",
    position: "relative",
    top: "50%",
    backgroundColor: "#c04710",
  },
  tmpImg: {
    height: "70%",
    width: "45%",
    position: "relative",
    bottom: "15%",
    left: 10,
  },
  headerImg: {
    width: "100%",
    height: 160,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "absolute",
  },
  headerImgLong: {
    width: "100%",
    height: 360,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "absolute",
  },
  welcomeText: {
    fontSize: 20,
    textAlign: "center",
    color: "#e6c173",
    fontWeight: "bold",
    marginTop: 10,
  },
  info: {
    position: "relative",
    bottom: "20%",
  },
  icon: {
    position: "relative",
    left: "37%",
    bottom: 14,
  },
  iconLong: {
    position: "relative",
    left: "18%",
    top: "25%",
  },
  icon2: {
    position: "relative",
    left: "90%",
    bottom: "31%",
  },
  logo: {
    width: "20%",
    height: 70,
    position: "relative",
    left: "15%",
    top: 10,
  },
  logoLong: {
    width: "30%",
    height: 100,
    position: "relative",
    left: "5%",
    top: 10,
  },
  input: {
    margin: 20,
    borderColor: "black",
    width: "40%",
    position: "relative",
    left: "37%",
    bottom: 55,
    color: "white",
    fontWeight: "bold",
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  inputLong: {
    margin: 20,
    borderColor: "black",
    width: "60%",
    position: "relative",
    left: "20%",
    top: "8%",
    color: "white",
    fontWeight: "bold",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    fontSize: 20,
  },
  tile_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 10,
  },
  title_innerContainer: {
    height: 140,
    borderRadius: 20,
    zIndex: 9,
  },
  title: {
    backgroundColor: "#ea5d7c",
    margin: 10,
    borderRadius: 20,
    position: "relative",
    width: "85%",
    height: 130,
  },
  title_casename: {
    margin: 10,
    width: "70%",
  },
  title_casenameText: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },

  title_year: {
    position: "absolute",
    width: "20%",
    height: 50,
    left: "75%",
    bottom: "50%",
    borderRadius: 5,
  },
  title_yearText: {
    paddingTop: 5,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  title_cited: {
    position: "absolute",
    width: "20%",
    bottom: "15%",
    left: "8%",
  },
  title_citedText1: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 10,
  },
  title_citedText2: {
    textAlign: "center",
    color: "white",
  },
  title_citedBy: {
    position: "absolute",
    width: "20%",
    bottom: "15%",
    left: "30%",
  },
  title_citedByText1: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 10,
  },
  title_citedByText2: {
    textAlign: "center",
    color: "white",
  },
  title_autho: {
    position: "absolute",
    width: "50%",
    bottom: "15%",
    left: "45%",
  },
  title_authoText1: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  title_authoText2: {
    textAlign: "center",
    fontSize: 10,
    color: "white",
  },
});
