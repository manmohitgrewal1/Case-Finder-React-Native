import * as React from 'react';
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
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
const cheerio = require('react-native-cheerio');
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import { MaterialIcons } from '@expo/vector-icons';

export default class BookmarkStack extends React.Component {
  constructor() {
    super();
    this.handle = this.handle.bind(this);
  }
  handle(key) {
    let nw_array = [];
    for (let i = 0; i < this.props.route.params.bookmarkCaseList.length; i++) {
      console.log(i, key);
      if (i !== key) {
        nw_array.push(this.props.route.params.bookmarkCaseList[i]);
      }
    }
    this.props.route.params.bookmarkCaseList = nw_array;
    this.props.route.params.updateHandler(nw_array);
    this.props.route.params.updateForcefully();
    this.forceUpdate();
  }
  render() {
    return (
      <View>
        <ScrollView>
        {this.props.route.params.bookmarkCaseList.length === 0 ? (<Text></Text>)
        :( 
          <View>
          {this.props.route.params.bookmarkCaseList.map((ele, index) => (
            <BookmarkTilesGenerator
              id={index}
              li={ele[0]}
              cities={ele[1]}
              citiedBy={ele[2]}
              court={ele[3]}
              docHref={ele[4]}
              navigate={this.props.navigation}
              action={this.handle}
            />
          ))}
          </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
class BookmarkTilesGenerator extends React.Component {
  render() {
    return (
      <Animatable.View animation="slideInLeft" style={styles.titleStyleOutter}>
        <View style={styles.titleStyle}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigate.navigate(
                'DocViewer',
                this.props.docHref[this.props.id]
              );
            }}>
            <View style={styles.title_innerContainer}>
              <View style={styles.title_casename}>
                <Text style={styles.title_casenameText}>
                  {this.props.li[0].split(' vs ')[0]} {'\n'}VS{'\n'}{' '}
                  {this.props.li[0].split(' vs ')[1]}
                </Text>
              </View>
              <View style={styles.title_year}>
                <Text style={styles.title_yearText}>
                  {this.props.li[1].split(' ')[2]}
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
        </View>
        <TouchableOpacity onPress={() => this.props.action(this.props.id)}>
          <MaterialIcons
            name="delete"
            size={24}
            color="black"
            style={{ position: 'relative', left: 10 }}
          />
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({
  titleStyle: {
    backgroundColor: '#7941f2',
    margin: 10,
    borderRadius: 20,
    position: 'relative',
    width: '75%',
    height: 130,
    shadowColor: '#c32fb1',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  titleStyleOutter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title_innerContainer: {
    height: 140,
    borderRadius: 20,
    zIndex: 9,
  },

  title_casename: {
    margin: 10,
    width: '70%',
  },
  title_casenameText: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },

  title_year: {
    position: 'absolute',
    width: '20%',
    height: 50,
    left: '75%',
    bottom: '50%',
    borderRadius: 5,
  },
  title_yearText: {
    paddingTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  title_cited: {
    position: 'absolute',
    width: '20%',
    bottom: '15%',
    left: '8%',
  },
  title_citedText1: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 10,
  },
  title_citedText2: {
    textAlign: 'center',
    color: 'white',
  },
  title_citedBy: {
    position: 'absolute',
    width: '20%',
    bottom: '15%',
    left: '30%',
  },
  title_citedByText1: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 10,
  },
  title_citedByText2: {
    textAlign: 'center',
    color: 'white',
  },
  title_autho: {
    position: 'absolute',
    width: '50%',
    bottom: '15%',
    left: '45%',
  },
  title_authoText1: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  title_authoText2: {
    textAlign: 'center',
    fontSize: 10,
    color: 'white',
  },
});
