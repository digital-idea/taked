import React, { Component } from "react";
import {
  Modal,
  Text,
  View,
} from "react-native";
import { Button } from "./button.js";

export class ModalWindow extends Component {
  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.props.visible}
        style={{flex:1}}
      >
        <View style={[{flex:1, alignItems:"center", justifyContent:"center"}, this.props.contextStyle]}>
          <View style={{flex:1}}>
          </View>
          { /* 윈도우 시작 */}
          <View style={[{width:500, borderColor:"black", borderWidth:1, borderRadius:5, backgroundColor:"#152535", flexDirection:"column", justifyContent:"center", alignItems:"center"}, this.props.windowStyle]}>
            <View style={[{width:"100%", padding:15, backgroundColor:"#223344", borderColor:"black", borderBottomWidth:1, justifyContent:"center", alignItems:"center"}, this.props.titleStyle]}>
              <Text style={{height:40, fontSize:30, color:"white"}}>{this.props.title}</Text>
            </View>
            <View style={[{width:"100%", padding:25}, this.props.bodyStyle]}>
              {this.props.children}
            </View>
            <View style={{width:"100%", padding:15, paddingLeft:25, paddingRight:25, borderTopColor:"black", borderTopWidth:1, flexDirection:"row-reverse", alignItems:"center"}}>
              <Button text="확인" onPress={this.props.onPressOK}></Button>
              <View style={{width:15}}></View>
              <Button text="취소" onPress={this.props.onPressCancel}></Button>
            </View>
          </View>
          { /* 윈도우 끝 */}
          <View style={{flex:2}}>
          </View>
        </View>
      </Modal>
    )
  }
}
