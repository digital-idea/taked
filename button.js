import React, { Component } from "react";
import {
  TouchableHighlight,
  Text,
} from "react-native";

export class Button extends Component {
  render() {
    return (
      <TouchableHighlight style={[this.props.style, {backgroundColor:"white", padding:10, borderRadius:5, borderWidth:1, borderColor:"black"}, this.props.style]} onPress={this.props.onPress}>
        <Text style={[{color:"black", fontSize:22}, this.props.textStyle]}>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }
}
