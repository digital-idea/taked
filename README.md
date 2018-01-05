# TakeD

TakeD는 현장 데이터 수집 앱입니다.
디지털아이디어에서 오픈소스로 진행합니다.

#### 설치

우선 node.js와 watchman을 설치해야 합니다.

https://nodejs.org/en/

IOS에서는 brew를 이용해서 설치하는 걸 권장하고 있습니다.

```
$ brew install node
$ brew install watchman
```

그 후 React Native를 설치합니다.

```
$ npm install -g react-native-cli
```

새 React Native 프로젝트를 만드려면 `react-native init` 명령을 사용합니다.
예로 taked는 다음과 같은 명령으로 시작되었습니다.

```
$ react-native init TakeD
```

이 명령을 실행하면 TakeD라는 디렉토리가 생성되고 그 안에 초기코드가 셑업됩니다.
저는 디렉토리명을 taked로 변경했습니다. 디렉토리 접근시 시프트키 쓰는것이 귀찮기 때문입니다.

```
$ mv TakeD taked
$ cd taked
```


#### 실행

우선 서버를 실행한 뒤

```
$ react-native start # 켜두세요
```

새로운 셸을 띄워 프로그램을 실행합니다.

```
$ react-native run-ios # 또는 run-android
```

Mac에서 그냥 프로그램을 실행하면 iPhone 시뮬레이터가 뜨게 됩니다.
저희는 iPad 앱을 만들고 있기 때문에 iPad 시뮬레이터를 띄워야 합니다.
저는 아래 명령으로 시뮬레이터를 실행합니다.

```
$ react-native run-ios --simulator="iPad Pro (9.7 inch)"
```

또는 이 명령을 넣어 놓은 `./run` 파일을 통해 실행하실 수도 있습니다.


#### 로그 보기

가끔 결과를 출력해서 보고 싶을 때가 있습니다.
node.js에는 파이썬의 print() 와 비슷한 console.log() 함수가 있습니다.

예를 들어 코드 내에서 다음처럼 현재 날짜를 출력 했을 때

```
console.log(this.state.day);
```

이를 보기 위해서는 react-native log-{ios|android} 명령을 사용해야 합니다.

```
$ cd {taked 경로}
$ react-native log-ios
```


### 안드로이드

만약 안드로이드로 전환이 필요하다면 참고할 내용입니다.

#### 현재 위치 찾기

`navigator.geolocation.getCurrentPosition(...)`을 통해 현재 위치에
접근할 수 있지만, 일단은 권한을 가지고 있어야 합니다.

android/app/src/main/AndroidManifest.xml 안의 적절한 곳에 다음 줄을 추가합니다.

```
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

위를 수정하고 나서는 `react-native run-android`를 다시 해줘야 합니다.


이후 getCurrentPosition 함수를 실행하면 timeout 에러가 납니다. (로그에 출력됨)

왜냐하면 에뮬레이터에서는 현재 위치값을 가져 올 수 없기 때문입니다.

따라서 아래의 과정을 거쳐 임의의 값을 넣어주어야 합니다.

```
$ telnet localhost 5554
> auth <auth_token>
> geo fix <longitude값> <latitude값>
```

여기서 auth_token의 값은 `$HOME/.emulator_console_auth_token` 파일안에 저장되어 있습니다.

값을 넣고 종료해서는 안됩니다. 이 커넥션이 유지되는 기간 동안만 현재 위치를 불러올 수 있기 때문입니다.
