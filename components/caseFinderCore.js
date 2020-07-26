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
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { Picker } from "@react-native-community/picker";

const cheerio = require("react-native-cheerio");
class Casetiles extends React.Component {
  titleStyle = () => {
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
          onPress={() => {
            this.props.navigate.navigate(
              "DocViewer",
              this.props.docHref[this.props.id]
            );
          }}
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
      selectedFilter: [],
      casename: [],
      message: [],
      court: [],
      cities: [],
      citiedBy: [],
      docHref: [],
      filterYear: [],
      filterCourts: [],
      loadCheck: false,
      isVisible: false,
      runningFilter: false,
    };
  }

  somefunction() {
    const arr2 = this.loadGraphicCards("hey yo");
    return arr2;
  }
  myTrim(x) {
    return x.replace(/^\s+|\s+$/gm, "");
  }

  courtListThrower(array) {
    const courtlist = [];
    let checker = false;
    let stopper = false;
    let i = 0;
    for (i = 0; i < array.length; i++) {
      if (array[i] === " Courts" || checker === true) {
        courtlist.push(array[i]);
        checker = true;
      }
    }
    return courtlist;
  }

  async componentDidMount(casename, filter, year) {
    if (this.state.loadCheck === false && !casename) {
      return;
    } else if (casename) {
      let searchUrl;
      if (year === "") {
        searchUrl = `https://indiankanoon.org/search/?formInput=${casename}+doctypes:${filter}`;
        console.log(searchUrl);
      } else {
        searchUrl = `https://indiankanoon.org/search/?formInput=${casename}+doctypes:${filter}+fromdate:1-1-${year}+todate:31-12-${year}`;
        console.log(searchUrl);
      }
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
      for (let i = 0; i < data.length; i++) {
        if (data[i].length === 1) {
          data[i].push("-");
        }
      }
      const filterCourts = $(".category");
      const li = filterCourts.text().split(/\r?\n/);
      const courtlist = [];
      let checkerCourts = false;
      let checkerYear = false;
      let stopper = false;
      let courtcourtlistst = [];
      let filterYear = [];
      let i = 0;
      for (i = 0; i < li.length; i++) {
        courtlist.push(this.myTrim(li[i]));
      }
      for (i = 0; i < courtlist.length; i++) {
        if (courtlist[i] === "Authors") {
          checkerCourts = false;
        }
        if (courtlist[i] === "Related Queries") {
          checkerYear = false;
        }
        if (checkerCourts === true) {
          if (courtlist[i] != "") {
            courtcourtlistst.push(courtlist[i]);
          }
        }
        if (checkerYear === true) {
          if (courtlist[i] != "") {
            filterYear.push(courtlist[i]);
          }
        }
        if (courtlist[i] === "Courts") {
          checkerCourts = true;
        }
        if (courtlist[i] === "Years") {
          checkerYear = true;
        }
      }
      this.setState({
        cities: citis,
        citiedBy: citiedBy,
        message: data,
        court: courts,
        docHref: docHref,
        filterCourts: courtcourtlistst,
        filterYear: filterYear,
        casename: casename,
        selectedFilter: casename[0],
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
  setModalVisible(e) {
    this.setState({ isVisible: e });
  }

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
                "Info shot!",
                "Search results are arranged in relevancy order"
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
            <Text style={styles.welcomeText}>Lets get searching!</Text>
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
              this.componentDidMount(text.nativeEvent.text, "judgments", "");
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
        {this.state.message.length === 0 ? (
          console.log("")
        ) : (
          <View style={styles.filterBtnContainter}>
            <TouchableHighlight
              style={styles.removeBtn}
              onPress={() => {
                this.componentDidMount(this.state.casename, "judgement", "");
              }}
            >
              <FontAwesome
                style={{ position: "relative", left: 4 }}
                name="remove"
                size={20}
                color="black"
              />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                this.setState({ runningFilter: true }, () =>
                  this.setModalVisible(!this.state.isVisible)
                );
              }}
            >
              <Text style={styles.textStyle}>Filter by Court</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                this.setState({ runningFilter: false }, () =>
                  this.setModalVisible(!this.state.isVisible)
                );
              }}
            >
              <Text style={styles.textStyle}>Filter by Date</Text>
            </TouchableHighlight>
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
              filterCourts={this.state.filterCourts}
            />
          </View>
        ))}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.modelContainer}>
            {this.state.runningFilter ? (
              <View style={styles.modelTop}>
                <View style={styles.modalBar}>
                  <TouchableHighlight
                    style={styles.openButton2}
                    onPress={() => {
                      this.setModalVisible(!this.state.isVisible);
                    }}
                  >
                    <AntDesign name="closecircle" size={24} color="black" />
                  </TouchableHighlight>
                  <Text style={styles.btnColor}>Filter by court</Text>
                  <TouchableHighlight
                    style={styles.openButton2}
                    onPress={() => {
                      this.setModalVisible(!this.state.isVisible);
                      this.componentDidMount(
                        this.state.casename,
                        this.state.selectedFilter,
                        ""
                      );
                    }}
                  >
                    <AntDesign name="checkcircle" size={24} color="black" />
                  </TouchableHighlight>
                </View>
                <Picker
                  selectedValue={this.state.selectedFilter}
                  style={{ height: 30, width: "100%", position: "relative" }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ selectedFilter: itemValue }, () =>
                      console.log(
                        "Selected this -->",
                        this.state.casename,
                        this.state.selectedFilter
                      )
                    )
                  }
                >
                  {this.state.filterCourts.map((court) => (
                    <Picker.Item label={court} value={court} />
                  ))}
                </Picker>
              </View>
            ) : (
              <View style={styles.modelTop}>
                <View style={styles.modalBar}>
                  <TouchableHighlight
                    style={styles.openButton2}
                    onPress={() => {
                      this.setModalVisible(!this.state.isVisible);
                    }}
                  >
                    <AntDesign name="closecircle" size={24} color="black" />
                  </TouchableHighlight>
                  <Text style={styles.btnColor}>Filter by Date</Text>
                  <TouchableHighlight
                    style={styles.openButton2}
                    onPress={() => {
                      this.setModalVisible(!this.state.isVisible);
                      this.componentDidMount(
                        this.state.casename,
                        "Judgement",
                        this.state.selectedFilter
                      );
                    }}
                  >
                    <AntDesign name="checkcircle" size={24} color="black" />
                  </TouchableHighlight>
                </View>
                <Picker
                  selectedValue={this.state.selectedFilter}
                  style={{ height: 30, width: "100%", position: "relative" }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ selectedFilter: itemValue }, () =>
                      console.log(
                        "Selected this -->",
                        this.state.casename,
                        this.state.selectedFilter
                      )
                    )
                  }
                >
                  {this.state.filterYear.map((year) => (
                    <Picker.Item label={year} value={year} />
                  ))}
                </Picker>
              </View>
            )}
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    color: "white",
  },
  btnColor: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    padding: 10,
  },
  modalBar: {
    textAlign: "center",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    backgroundColor: "#e8e0dc",
  },
  modelContainer: {
    flex: 1,
    justifyContent: "flex-end",
    textAlign: "center",
    height: "30%",
  },
  modelTop: {
    height: 250,
    backgroundColor: "white",
  },
  filterBtnContainter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    justifyContent: "space-around",
  },
  removeBtn: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    width: "9%",
    textAlign: "center",
    position: "relative",
    left: "10%",
    bottom: "4%",
  },
  openButton: {
    backgroundColor: "#efa25c",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "30%",
    textAlign: "center",
    position: "relative",
    bottom: "4%",
  },
  openButton2: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    left: 5,
    right: "10%",
  },
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
    top: "34%",
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
    top: "15%",
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
