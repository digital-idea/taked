import React, { Component } from "react";
import {
  Button,
  View,
} from "react-native";

export class HomeScreen extends Component {
  static navigationOptions = {
    title: 'ProjectName',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          title="Go to project info"
          onPress={() =>
            navigate('Project', {})
          }
        />
        <Button
          title="Go to cut info"
          onPress={() =>
            navigate('Cut', {project:"ProjectName", scene:"A1", cut:"30"})
          }
        />
      </View>
    );
  }
}
