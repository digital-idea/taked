import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "./button.js";

export class CutSelectionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: this.props.navigation.state.params.project,
      cuts: [
        {scene: "S001", cut:"C003", created:"2017-05-07", shooting_date:"2017-06-12", shooting_day:"3", comment:"", location:"동네 운동장", description:"아이가 달린다."},
        {scene: "S001", cut:"C007", created:"2017-09-03", shooting_date:"2017-06-12", shooting_day:"3", comment:"까마귀가 울부짖음.", location:"동네 운동장", description:"달리던 아이가 넘어진다. 하지만 그 아이는 곧바로 다시 일어선다."},
        {scene: "S001", cut:"C001", created:"2017-01-02", shooting_date:"2017-06-23", shooting_day:"1", comment:"", location:"마을 회관", description:"고스톱을 치시는 할아버지 할머니"},
        {scene: "S002", cut:"C002", created:"2017-03-03", shooting_date:"2018-01-03", shooting_day:"2", comment:"얼굴 갸름하게", location:"고깃집", description:"연기로 자욱한 고깃집, 한 남자가 입구를 계속 쳐다보며 누군가를 기다린다."},
        {scene: "S002", cut:"C001", created:"2017-04-12", shooting_date:"2017-06-12", shooting_day:"2", comment:"", location:"동네 운동장", description:"아이스크림 냠냠"},
      ],
      activeSortMethod: "scene",
      activeSortMethodName: "씬",
      ascendingSort: true,
    }

    this.compareMethod = this.compareMethod.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.project} 프로젝트`,
  });

  compareMethod() {
    var m = undefined;
    if (this.state.activeSortMethod == "scene") {
      m = compareName;
    } else if (this.state.activeSortMethod == "shooting_day") {
      m = compareShootingDay;
    } else if (this.state.activeSortMethod == "created") {
      m = compareCreated;
    }
    if (!this.state.ascendingSort) {
      m = compareSwapper(m)
    }
    return m;
  }

  reduceMethod() {
    var m = undefined;
    if (this.state.activeSortMethod == "scene") {
      m = reduceScene;
    } else if (this.state.activeSortMethod == "shooting_day") {
      m = reduceShootingDay;
    } else if (this.state.activeSortMethod == "created") {
      m = reduceCreated;
    }
    return m;
  }

  render() {
    const { navigate } = this.props.navigation;

    let sortGroupItems = this.state.cuts.sort(this.compareMethod()).reduce(this.reduceMethod(), []).map((v, i) => {
      return (
        <View key={i} style={{height:80, padding:10, borderBottomWidth:1, borderColor:"black"}}>
          <Text style={styles.normalText}>{v}</Text>
        </View>
      )
    });

    let cutItems = this.state.cuts.sort(this.compareMethod()).map((v, i) => {
      return (
        <TouchableOpacity
          key={i}
          onPress={() => {
            navigate('Cut', {project: this.state.project, scene: v.scene, cut: v.cut});
          }}
        >
          <View style={{flexDirection:"row", padding:10, borderBottomWidth:1, borderColor:"black"}}>
            <TouchableOpacity style={{width:130, height:80, marginRight:20, borderColor:"#081216", borderWidth:1, backgroundColor:"#112233"}}>
            </TouchableOpacity>
            <View style={{width:100}}>
              <Text style={[styles.tinyText, {color:"gray"}]}>{v.scene}</Text>
              <Text style={[styles.normalText]}>{v.cut}</Text>
            </View>
            <View style={{flex:1}}>
              <View style={{flex:1, flexDirection:"row", marginBottom:3}}>
                <Text style={[styles.tinyText, {marginTop:4, color:"gray", marginRight:5}]}>촬영</Text>
                <Text style={[{width:60}, styles.smallText, {color:"lightgray"}]}>#{v.shooting_day}</Text>
                <Text style={[styles.tinyText, {marginTop:4, color:"gray", marginRight:5}]}>장소</Text>
                <Text style={[{width:150}, styles.smallText, {color:"lightgray"}]}>{v.location}</Text>
              </View>
              <View style={{flex:1, flexDirection:"row", marginBottom:3}}>
                <Text style={[styles.tinyText, {marginTop:4, color:"gray", marginRight:5}]}>내용</Text>
                <Text numberOfLines={1} style={[styles.smallText, {color:"lightgray"}]}>{v.description}</Text>
              </View>
              <View style={{flex:1, flexDirection:"row", marginBottom:3}}>
                <Text style={[styles.tinyText, {marginTop:4, color:"gray", marginRight:5}]}>코멘트</Text>
                <Text numberOfLines={1} style={[styles.smallText, {color:"lightgray"}]}>{v.comment}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    });

    return (
      <View style={{flex:1}}>
        <View style={styles.filterView}>
          <Button
            text="씬"
            style={this.state.activeSortMethod == "scene" ? styles.activeSortMethodButton : styles.filterButton}
            textStyle={this.state.activeSortMethod == "scene" ? styles.activeSortMethodButtonText : styles.filterButtonText}
            onPress={() => {
              this.setState({activeSortMethod: "scene", activeSortMethodName: "씬"})
            }}
          >
          </Button>
          <Button
            text="촬영회차"
            style={this.state.activeSortMethod == "shooting_day" ? styles.activeSortMethodButton : styles.filterButton}
            textStyle={this.state.activeSortMethod == "shooting_day" ? styles.activeSortMethodButtonText : styles.filterButtonText}
            onPress={() => {
              this.setState({activeSortMethod: "shooting_day", activeSortMethodName: "촬영회차"})
            }}
          >
          </Button>
          <Button
            text="생성날짜"
            style={this.state.activeSortMethod == "created" ? styles.activeSortMethodButton : styles.filterButton}
            textStyle={this.state.activeSortMethod == "created" ? styles.activeSortMethodButtonText : styles.filterButtonText}
            onPress={() => {
              this.setState({activeSortMethod: "created", activeSortMethodName: "생성날짜"})
            }}
          >
          </Button>
        </View>
        <View style={{flex:1, flexDirection:"row"}}>
          <View style={styles.leftView}>
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>{this.state.activeSortMethodName}</Text>
            </View>
            <View style={styles.mainView}>
              <ScrollView style={{flex:1}}>
                {sortGroupItems}
              </ScrollView>
            </View>
          </View>
          <View style={styles.rightView}>
            <View style={styles.categoryView}>
              <Text style={styles.categoryText}>컷</Text>
              <TouchableOpacity style={styles.changeSortOrderButton} onPress={() => {
                this.setState({ascendingSort: !this.state.ascendingSort});
              }}>
                { /* 할일: 아이콘으로 변경 */ }
                <Text style={styles.normalText}>정렬</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainView}>
              <ScrollView>
                {cutItems}
              </ScrollView>
            </View>
        </View>
        </View>
      </View>
    )
  }
}

function compareSwapper(f) {
  return (a, b) => {
    return f(a, b) * -1;
  }
}

// compareName은 컷을 씬, 컷의 이름 순으로 정렬한다.
function compareName(a, b) {
  if (a.scene < b.scene) {
    return -1;
  } else if (a.scene > b.scene) {
    return 1;
  }
  if (a.cut < b.cut) {
    return -1;
  } else if (a.cut > b.cut) {
    return 1;
  }
  return 0;
}

function compareShootingDay(a, b) {
  if (a.shooting_day < b.shooting_day) {
    return -1;
  } else if (a.shooting_day > b.shooting_day) {
    return 1;
  }
  return 0;
}

function compareCreated(a, b) {
  if (a.created < b.created) {
    return -1;
  } else if (a.created > b.created) {
    return 1;
  }
  return 0;
}

function reduceScene(a, b) {
  if (!a.includes(b.scene)) {
    a.push(b.scene);
  }
  return a;
}

function reduceShootingDay(a, b) {
  if (!a.includes(b.shooting_day)) {
    a.push(b.shooting_day);
  }
  return a;
}

function reduceCreated(a, b) {
  if (!a.includes(b.created)) {
    a.push(b.created);
  }
  return a;
}

var styles = {
  tinyText: {
    color: "white",
    fontSize: 16,
  },
  smallText: {
    color: "white",
    fontSize: 18,
  },
  normalText: {
    color: "white",
    fontSize: 23,
  },
  titleText: {
    color: "white",
    fontSize: 30,
  },
  filterView: {
    height:80,
    backgroundColor:"#141822",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around"
  },
  filterButton: {
    width:230,
    backgroundColor:"#081012",
    alignItems:"center",
  },
  filterButtonText: {
    color:"#223344",
  },
  activeSortMethodButton: {
    width:230,
    backgroundColor:"#334455",
    alignItems:"center",
  },
  activeSortMethodButtonText: {
    color:"white",
  },
  leftView: {
    width:220,
    borderColor:"black",
    borderRightWidth:1,
  },
  rightView: {
    flex:2,
  },
  categoryView: {
    height:80,
    backgroundColor:"#112233",
    padding:20,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  changeSortOrderButton: {
    width:70,
    height:"100%",
    backgroundColor:"#081012",
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center",
  },
  categoryText: {
    color:"white",
    fontSize:30,
  },
  mainView: {
    flex:1,
    backgroundColor:"#223344",
    flexDirection:"row",
  },
}
