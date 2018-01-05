import React, { Component } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { ModalWindow } from "./modal.js";

import { incSuffix } from "./suffix.js";

class Category extends Component {
  render() {
    return (
      <View style={styles.category}>
        <View style={styles.categoryLabel}>
          <Text style={styles.categoryLabelText}>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    )
  }
}

class Item extends Component {
  render() {
    return (
      <View style={styles.item}>
        <View style={styles.itemLabel}>
          <Text style={styles.itemLabelText}>{this.props.label}</Text>
        </View>
        <View style={styles.itemContainer}>
          {this.props.children}
        </View>
      </View>
    )
  }
}


export class ProjectConfigScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      crankIn: "",
      crankOut: "",

      contacts: { // 사전처럼 사용한다.
        "director": {
          name: "",
          number: "",
        },
        "supervisor": {
          name: "",
          number: "",
        },
        "assistant": {
          name: "",
          number: "",
        },
        "scripter": {
          name: "",
          number: "",
        },
        "scripter": {
          name: "",
          number: "",
        },
        "pd": {
          name: "",
          number: "",
        },
        "pm": {
          name: "",
          number: "",
        },
      },

      cameras: [],
      lenses: [],

      outputResolution: "",
      outputAspectRatio: "",

      modalVisible: false,
      deleteProjectName: "",
    };

    this.ContactInput.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.project} 설정`,
  });

  ContactInput(roll) {
    return (
      <TouchableOpacity style={{flex:1, flexDirection:"row"}}>
        <TextInput
          style={styles.contactNameTextInput}
          placeholder="이름"
          value={this.state.contacts[roll].name}
          onChangeText={(name) => {
            var {contacts} = this.state;
            contacts[roll].name = name;
            this.setState({contacts});
          }}
        />
        <TextInput
          keyboardType="phone-pad"
          style={styles.contactNumberTextInput}
          placeholder="전화번호"
          value={this.state.contacts[roll].number}
          onChangeText={(number) => {
            var {contacts} = this.state;
            contacts[roll].number = number;
            this.setState({contacts});
          }}
        />
      </TouchableOpacity>
    )
  }

  setModalVisible(visible) {
    this.setState({modalVisible:visible});
  }

  componentDidMount() {
    this.props.navigation.setParams({handleSetModalVisible: this.setModalVisible});
  }

  render() {
      const { navigate } = this.props.navigation;

      let CameraItems = this.state.cameras.map((v, i) => {
        return (
          <Item key={i} label={v.label}>
          <TextInput
            style={styles.itemTextInput}
            value={this.state.cameras[i].name}
            onChangeText={(name) => {
              var {cameras} = this.state;
              cameras[i].name = name
              this.setState({cameras})
            }}
          />
          </Item>
        )
      });

      let LensItems = this.state.lenses.map((v, i) => {
        return (
          <Item key={i} label={v.label}>
          <TextInput
            style={[styles.itemTextInput, {flex:1}]}
            placeholder="이름"
            value={this.state.lenses[i].name}
            onChangeText={(name) => {
              var {lenses} = this.state;
              lenses[i].name = name
              this.setState({lenses})
            }}
          />
          <TextInput
            style={[styles.itemTextInput, {flex:2}]}
            placeholder="시리얼 넘버"
            value={this.state.lenses[i].serial}
            onChangeText={(serial) => {
              var {lenses} = this.state;
              lenses[i].serial = serial
              this.setState({lenses})
            }}
          />
          </Item>
        )
      });

    return (
      <View style={{flex:1}}>
        <ModalWindow
          visible={this.state.modalVisible}
          contextStyle={{backgroundColor:"black"}}
          windowStyle={{backgroundColor:"#770000"}}
          title="프로젝트 삭제"
          titleStyle={{backgroundColor:"#aa1111"}}
          onPressCancel={() => {
            this.setState({deleteProjectName: ""})
            this.setModalVisible(false);
          }}
          onPressOK={() => {
            var {deleteProjectName} = this.state;
            if (deleteProjectName == this.state.projectName) {
              // 할일: 프로젝트 지우기
            }
            this.setState({deleteProjectName: ""})
            this.setModalVisible(false);
          }}
        >
          <Text style={{fontSize:25, color:"white", marginBottom:10}}>주의: 프로젝트를 지우면 되살릴 수 없습니다.</Text>
          <Text style={{fontSize:25, color:"white"}}>이 프로젝트를 정말로 지우려면 프로젝트 이름을 쓰고 확인 버튼을 눌러주세요.</Text>
          <TextInput
            value={this.state.deleteProjectName}
            style={{fontSize:30, height:50, marginTop:40, borderRadius:2, backgroundColor:"white"}}
            onChangeText={(deleteProjectName) => this.setState({deleteProjectName})}
          />
        </ModalWindow>

        <ScrollView style={styles.root}>
          <Category label="기본 정보">
            <Item label="이름">
              <TextInput
                style={styles.itemTextInput}
                value={this.state.name}
                onChangeText={(name) => {
                  this.setState({name})
                }}
              />
            </Item>
            <Item label="크랭크 인">
              <TextInput
                style={styles.itemTextInput}
                value={this.state.crankIn}
                onChangeText={(crankIn) => {
                  this.setState({crankIn})
                }}
              />
            </Item>
            <Item label="크랭크 아웃">
              <TextInput
                style={styles.itemTextInput}
                value={this.state.crankOut}
                onChangeText={(crankOut) => {
                  this.setState({crankOut})
                }}
              />
            </Item>
          </Category>
          <Category label="연락처">
            <Item label="감독">
              {this.ContactInput("director")}
            </Item>
            <Item label="슈퍼바이저">
              {this.ContactInput("supervisor")}
            </Item>
            <Item label="어시스턴트">
              {this.ContactInput("assistant")}
            </Item>
            <Item label="스크립터">
              {this.ContactInput("scripter")}
            </Item>
            <Item label="PD">
              {this.ContactInput("pd")}
            </Item>
            <Item label="PM">
              {this.ContactInput("pm")}
            </Item>
          </Category>
          <Category label="카메라">
            {CameraItems}
            <TouchableHighlight
              style={styles.addItemButton}
              onPress={() => {
                var {cameras} = this.state;
                if (cameras.length == 0) {
                  cameras.push({label:"카메라1", name:""});
                  this.setState({cameras});
                  return;
                }
                var last = cameras[cameras.length - 1];
                var newLabel = incSuffix(last.label);
                cameras.push({label:newLabel, name:""});
                this.setState({cameras});
              }}
            >
              <Text style={{color:"yellow", fontSize:25}}>+</Text>
            </TouchableHighlight>
          </Category>
          <Category label="렌즈">
            {LensItems}
            <TouchableHighlight
              style={styles.addItemButton}
              onPress={() => {
                var {lenses} = this.state;
                if (lenses.length == 0) {
                  lenses.push({label:"렌즈1", name:"", serial:""});
                  this.setState({lenses});
                  return;
                }
                var last = lenses[lenses.length - 1];
                var newLabel = incSuffix(last.label);
                lenses.push({label:newLabel, name:"", serial:""});
                this.setState({lenses});
              }}
            >
              <Text style={{color:"yellow", fontSize:25}}>+</Text>
            </TouchableHighlight>
          </Category>
          <Category label="아웃풋">
            <Item label="해상도">
              <TextInput
                style={styles.itemTextInput}
                value={this.state.outputResolution}
                onChangeText={(outputResolution) => {
                  this.setState({outputResolution})
                }}
              />
            </Item>
            <Item label="화면 비율">
              <TextInput
                style={styles.itemTextInput}
                value={this.state.outputAspectRatio}
                onChangeText={(outputAspectRatio) => {
                  this.setState({outputAspectRatio})
                }}
              />
            </Item>
          </Category>
          <Category label="삭제">
            <View style={{flex:1, flexDirection:"row", justifyContent:"flex-end"}}>
              <TouchableHighlight
                style={[styles.deleteProjectButton, {width:150}]}
                onPress={() => {
                  this.setModalVisible(true)
                }}
              >
                <Text style={styles.text}>지우기</Text>
              </TouchableHighlight>
            </View>
          </Category>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 23,
    color: "white",
  },
  root: {
    flex: 1,
    backgroundColor:"#141822",
  },
  category: {
    paddingBottom:40,
  },
  categoryLabel: {
    backgroundColor:"#112233",
    flexDirection: "row",
    padding: 10,
    paddingTop:20,
    marginBottom:6,
  },
  categoryLabelText: {
    fontSize: 30,
    color: "white",
  },
  item: {
    height:60,
    margin:10,
    marginTop:20,
    borderRadius:5,
    borderColor:"black",
    borderWidth:1,
    flexDirection:"row",
  },
  itemLabel: {
    width:150,
    padding:10,
    backgroundColor:"#112233",
    justifyContent:"center"
  },
  itemLabelText: {
    fontSize:23,
    color:"white",
  },
  itemContainer: {
    flex:1,
    padding:10,
    backgroundColor:"#334455",
    flexDirection: "row",
  },
  itemTextInput: {
    flex:1,
    color:"white",
    fontSize:23,
  },
  contactNameTextInput: {
    flex:1,
    color:"white",
    fontSize:23,
  },
  contactNumberTextInput: {
    flex:2,
    color:"white",
    fontSize:23,
  },
  addItemButton: {
    height:60,
    margin:10,
    marginTop:20,
    borderRadius:5,
    backgroundColor: "transparent",
    borderColor:"yellow",
    borderWidth:1,
    justifyContent:"center",
    alignItems:"center",
  },
  deleteProjectButton: {
    height:60,
    margin:10,
    marginTop:20,
    borderRadius:5,
    backgroundColor: "red",
    borderColor:"black",
    borderWidth:1,
    justifyContent:"center",
    alignItems:"center",
  },
})
