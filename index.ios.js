"use strict";

import React from 'react';

import {
  Button,
  AppRegistry
} from "react-native";

import {
  StackNavigator,
} from 'react-navigation';

import { HomeScreen } from "./home.ios.js";
import { ProjectScreen } from "./project.ios.js";
import { ProjectConfigScreen } from "./project_config.ios.js";
import { CutSelectionScreen } from "./cut_selection.ios.js";
import { CutScreen } from "./cut.ios.js";

const TakeD = StackNavigator({
  Home: { screen: HomeScreen },
  Project: { screen: ProjectScreen },
  ProjectConfig: { screen: ProjectConfigScreen },
  CutSelection: { screen: CutSelectionScreen },
  Cut: { screen: CutScreen },
});

AppRegistry.registerComponent('TakeD', () => TakeD);
