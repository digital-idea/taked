"use strict";

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Picker,
  TouchableOpacity,
  TouchableHighlight,
  DatePickerIOS,
  TimePickerIOS,
  ScrollView,
  View
} from 'react-native';

import { incSuffix } from "./suffix.js";

export class CutScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.scene} - ${navigation.state.params.cut}`,
  });

  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitue: "",
      scene: "A1",
      cut: "30",
      takes: [
        {num:"1", rollNum:"A083-C019", confirm:"NG"},
        {num:"2", rollNum:"A083-C020", confirm:"OK"},
      ],
      units: [
        {name:"A", camera:"Arri ALEXA", lens:"Leica", lens_mm:"20"},
      ],
      time: "D",
      place: "S",
      sceneDescription: "논 둑의 가장자리를 뒤지던 형사는 돌틈 사이에서 무언가 날카로운 것을 발견한다.",
      camMove: "",
      vfxWork: "",
    }
    this.render = this.render.bind(this);
    this.pickDate = this.pickDate.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.language = "java";
  }

  async pickDate() {
    try {
      const {action, year, month, day} = await DatePickerIOS.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(2020, 4, 25)
      });
      if (action !== DatePickerIOS.dismissedAction) {
        // Selected year, month (0-11), day
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  async pickTime() {
    try {
      const {action, hour, minute} = await TimePickerIOS.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerIOS.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.setState({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }

  render() {
    let unitCategory = this.state.units.map((v, i) => {
      return (
        <View style={styles.row} key={i}>
          <View style={styles.item}>
            <Text style={styles.label}>유닛</Text>
            <TextInput
              style={[styles.inputBox, styles.normalText, {flex:1, width:70}]}
              value={this.state.units[i].name}
              onChangeText={(v) => {
                var {units} = this.state;
                units[i].name = v.toUpperCase();
                this.setState({units})
              }}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>카메라</Text>
            <TextInput
              style={[styles.inputBox, styles.normalText, {flex:1, width:200}]}
              value={this.state.units[i].camera}
              onChangeText={(v) => {
                var {units} = this.state;
                units[i].camera = v;
                this.setState({units})
              }}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>렌즈</Text>
            <TextInput
              style={[styles.inputBox, styles.normalText, {flex:1, width:120}]}
              value={this.state.units[i].lens}
              onChangeText={(v) => {
                var {units} = this.state;
                units[i].lens = v;
                this.setState({units})
              }}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>mm</Text>
            <TextInput
              keyboardType={"numeric"}
              style={[styles.inputBox, styles.normalText, {flex:1, width:80}]}
              value={this.state.lens_mm}
              value={this.state.units[i].lens_mm}
              onChangeText={(v) => {
                var {units} = this.state;
                units[i].lens_mm  = v;
                this.setState({units})
              }}
            />
          </View>
        </View>
      )
    })

    let takeCategory = this.state.takes.map((v, i) => {
      return (
          <View style={styles.row} key={i}>
            <View style={styles.item}>
              <Text style={styles.label}>테이크</Text>
              <TextInput
                keyboardType="numbers-and-punctuation"
                style={[styles.inputBox, styles.normalText, {width: 65}]}
                value={this.state.takes[i].num}
                onChangeText={(v) => {
                  var {takes} = this.state;
                  takes[i].num = v;
                  this.setState({takes})
                }}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>롤 넘버</Text>
              <TextInput
                style={[styles.inputBox, styles.normalText, {width: 250}]}
                value={this.state.takes[i].rollNum}
                onChangeText={(v) => {
                  var {takes} = this.state;
                  takes[i].rollNum = v;
                  this.setState({takes})
                }}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>정보</Text>
              <TouchableOpacity style={[styles.inputBox, {padding:0, paddingLeft:3, paddingRight:3}]} onPress={() => alert("OK(O), Keep(K), NG(N)")}>
                <Text style={[styles.normalText, {width: 80}]}>{this.state.takes[i].confirm}</Text>
              </TouchableOpacity>
            </View>
          </View>
      )
    })

    return (
      <View style={{flex: 1, backgroundColor:"#546e7a"}}>
        <ScrollView>
          <View style={styles.category}>
            <Text style={styles.normalText}>촬영정보</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.label}>촬영날짜</Text>
              <Text style={[styles.inputBox, styles.normalText]} onPress={this.pickDate}>2017-06-23</Text>
            </View>
            <TouchableOpacity onPress={this.pickTime} style={[styles.item, {width: 150}]}>
              <Text style={styles.label}>시간</Text>
              <Text style={[styles.inputBox, styles.normalText]}>오후 2:30</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.label}>위치</Text>
              <View style={{flexDirection: "row", flex: 1}}>
                <TouchableHighlight onPress={this.getCurrentLocation} style={{backgroundColor: "white", margin:4, borderRadius:8, padding: 4}}>
                  <Image source={require("./img/map-pin.png")} style={{width:24, height:24}}/>
                </TouchableHighlight>
                <Text style={styles.normalText}>{this.state.latitude}, {this.state.longitude}</Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection:"column", backgroundColor:"#29434e"}}>
            <Text style={[styles.label, {margin:5}]}>사진</Text>
            <View style={{flexDirection:"row", flex:1, flexWrap:"wrap", backgroundColor:"#29434e"}}>
            <TouchableHighlight style={[styles.inputBox, {margin:10, flex:0, width:235, height:160, borderWidth:0, borderRadius:0}]} onPress={() => {console.log("add top")}}>
              <Text style={{color:"#90a4ae", fontSize:40}}>top</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.inputBox, {margin:10, flex:0, width:235, height:160, borderWidth:0, borderRadius:0}]} onPress={() => {console.log("add end")}}>
              <Text style={{color:"#90a4ae", fontSize:40}}>end</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.inputBox, {margin:10, flex:0, width:235, height:160, borderWidth:0, borderRadius:0}]} onPress={() => {console.log("add other pictures")}}>
              <Text style={{color:"#90a4ae", fontSize:40}}>+</Text>
            </TouchableHighlight>
            </View>
          </View>
          <View style={styles.category}>
            <Text style={styles.normalText}>컷정보</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.label}>시간대</Text>
              <TouchableOpacity style={styles.inputBox} onPress={() => alert("낮(D), 밤(N)")}>
                <Text style={[styles.normalText, {width:80}]}>낮</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>공간</Text>
              <TouchableOpacity style={styles.inputBox} onPress={() => alert("실내세트(S), 실외세트(O), 로케이션(L)")}>
                <Text style={[styles.normalText, {width:160}]}>실내세트</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.row, {height:160}]}>
            <View style={styles.item} style={{flex:1}}>
              <Text style={styles.label}>씬 내용</Text>
              <TextInput multiline={true}
                style={[styles.multilineInputBox, styles.normalText]}
                value={this.state.sceneDescription}
                onChangeText={(v) => this.setState({sceneDescription: v})}
              />
            </View>
          </View>
          <View style={[styles.row, {height:130}]}>
            <View style={styles.item} style={{flex:1}}>
              <Text style={styles.label}>카메라 이동</Text>
              <TextInput multiline={true}
                style={[styles.multilineInputBox, styles.normalText]}
                value={this.state.camMove}
                onChangeText={(v) => this.setState({camMove: v})}
              />
            </View>
          </View>
          <View style={[styles.row, {height:200}]}>
            <View style={styles.item} style={{flex:1}}>
              <Text style={styles.label}>VFX 작업내용</Text>
              <TextInput multiline={true}
                style={[styles.multilineInputBox, styles.normalText]}
                value={this.state.vfxWork}
                onChangeText={(v) => this.setState({vfxWork: v})}
              />
            </View>
          </View>
          <View style={styles.category}>
              <Text style={styles.normalText}>카메라</Text>
          </View>
          {unitCategory}
          <TouchableHighlight
            style={[styles.row, {justifyContent:"center", alignItems:"center"}]}
            onPress={() => {
              // 새로운 유닛 생성
              var {units} = this.state;
              var last = units[units.length - 1];
              var newName = incSuffix(last.name);
              units.push({name:newName, camera:"", lens:"", lens_mm:""});
              this.setState({units});
            }}
          >
            <Text style={[styles.normalText, {textAlign:"center"}]}>+</Text>
          </TouchableHighlight>
          <View style={styles.category}>
              <Text style={styles.normalText}>테이크</Text>
          </View>
          {takeCategory}
          <TouchableHighlight
            style={[styles.row, {justifyContent:"center", alignItems:"center"}]}
            onPress={() => {
              // 새로운 테이크 생성
              var {takes} = this.state;
              var last = takes[takes.length - 1];
              var newNum = incSuffix(last.num);
              var newRollNum = incSuffix(last.rollNum);
              takes.push({num:newNum, rollNum:newRollNum, confirm:""});
              this.setState({takes});
            }}
          >
            <Text style={[styles.normalText, {textAlign:"center"}]}>+</Text>
          </TouchableHighlight>
          <View style={styles.background} />
        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  category: {
    backgroundColor: "transparent",
    flexDirection: "row",
    padding: 10,
    marginTop:12,
    marginBottom:6,
  },
  row: {
    height: 75,
    backgroundColor: "#29434e",
    flexDirection: "row",
    marginBottom: 2,
  },
  item: {
    padding: 5,
    marginRight: 5,
  },
  label: {
    fontSize: 15,
    color: "white",
    marginBottom: 5,
  },
  normalText: {
    fontSize: 30,
    color: "white",
  },
  inputBox: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth:1, borderRadius: 6, borderColor: "black",
    backgroundColor: "#06212a",
  },
  multilineInputBox: {
    flex: 1,
    margin: 10,
    padding: 10,
    overflow: "hidden",
    borderWidth:1, borderRadius: 6, borderColor: "black",
    backgroundColor: "#06212a",
  },
  background: {
    flex: 1,
    height: 350,
    backgroundColor: "#546e7a",
  }
});
