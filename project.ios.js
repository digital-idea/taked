import React, { Component } from "react";
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  View,
} from "react-native";
import { ModalWindow } from "./modal.js";

export class ProjectScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prjs: [
        {key: "테스트"},
        {key: "군함도"},
      ],
      addPrj: "",
      modalVisible: false,
    };

    this.setModalVisible = this.setModalVisible.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    title: "프로젝트",
    headerRight: (
      <Button
        title="추가"
        onPress={() => {
          navigation.state.params.handleSetModalVisible(true)
        }}
      />
    ),
  });

  setModalVisible(visible) {
    this.setState({modalVisible:visible})
  }

  componentDidMount() {
    this.props.navigation.setParams({handleSetModalVisible: this.setModalVisible})
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor:"#546e7a"}}>
        <ModalWindow
          visible={this.state.modalVisible}
          title="프로젝트 생성"
          onPressCancel={() => {
            this.setModalVisible(false)
          }}
          onPressOK={() => {
            var {prjs} = this.state;
            for (var i = 0; i < prjs.length; i++) {
              if (prjs[i].key == this.state.addPrj) {
                return;
              }
            }
            prjs.push({key: this.state.addPrj});
            this.setState({addPrj: ""});
            this.setState({prjs});
            this.setModalVisible(false);
          }}
        >
          <Text style={{fontSize:25, color:"white"}}>생성할 프로젝트의 이름을 적어주세요.</Text>
          <TextInput
            value={this.state.addPrj}
            style={{height:50, fontSize:30, marginTop:40, borderRadius:2, backgroundColor:"white"}}
            onChangeText={(addPrj) => this.setState({addPrj})}
          />
        </ModalWindow>

        <FlatList
          data={this.state.prjs}
          extraData={this.state}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => {
                navigate('CutSelection', {project:item.key})
              }}
            >
              <View style={{flex:1, flexDirection:"row"}}>
                <View style={{flex:1, margin:15, paddingLeft:20, justifyContent:"center"}}>
                  <Text style={styles.normalText}>{item.key}</Text>
                </View>
                <TouchableOpacity
                  style={{margin:15, width:90, alignItems:"center", justifyContent: "center", borderRadius:3, borderWidth:1, borderColor:"#112233"}}
                  onPress={() => navigate('ProjectConfig', {project: item.key})}
                >
                  <Text style={styles.projectConfigButtonText}>설정 ></Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
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
    margin: 25,
    marginTop: 30,
    marginBottom: 0,
    borderRadius: 5,
  },
  normalText: {
    fontSize: 30,
    color: "white",
  },
  projectConfigButtonText: {
    fontSize: 24,
    color: "lightgrey",
  },
  background: {
    flex: 1,
    height: 350,
    backgroundColor: "#546e7a",
  }
});
