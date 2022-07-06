import React from 'react';
import { StyleSheet, Text, View, Animated, ScrollView,Image } from 'react-native';
import States from './components/states';
import { COLORS } from './components/constant/colors';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      scrollY: new Animated.Value(0),
      demoText: "hello",
      countryData: null,
      yesterdayCountryData:null,
      stateData: [],
      dailyData: null,
      worldData: null
    };
  }

  componentDidMount() {
    this.fetchCovidWorldData();
    this.fetchCovidIndiaData();
    
  }
  fetchCovidWorldData() {
    fetch(`https://api.thevirustracker.com/free-api?global=stats`).then(res => res.json())
      .then(json => {
        this.setState({
          worldData: json.results[0]
        })
      })
  }

  fetchCovidIndiaData() {
    fetch(`https://api.covid19india.org/data.json`).then(res => res.json())
      .then(json => {
        this.setState({
          isLoading: false,
          countryData: json.statewise[0],
          yesterdayCountryData: json.cases_time_series.pop(),
          stateData: json.statewise.slice(1)
        });
       
      });
  }

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) =>
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        )}
      </View>
    );
  }
  componentWillReceiveProps(){
    this.setState({...this.state})
  }
  refreshData() {
    this.setState({
      isLoading: false,
      countryData: null,
      stateData: [],
      dailyData: null,
      worldData: null});
    this.fetchCovidWorldData();
    this.fetchCovidIndiaData();
  }


  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });


    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });
    // const { isLoading, stateData, countryData, worldData } = this.state;
    return (
      
      <View style={styles.container}>
        {(!this.state.isLoading && !!this.state.stateData && this.state.stateData.length > 0) ? (

          <View style={styles.fill}>
            <ScrollView
              style={styles.fill}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
              )}
            >
              <States stateWiseData={this.state.stateData} countryData={this.state.countryData} yesterdayCountryData={this.state.yesterdayCountryData}  worldData={this.state.worldData} refreshData={this.refreshData.bind(this)} />

              {/* {this._renderScrollViewContent()} */}

            </ScrollView>
            <Animated.View style={[styles.header, { height: headerHeight }]}>
              <Animated.Image
                style={[
                  styles.backgroundImage,
                  { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] },
                ]}
                source={require('./assets/background3.jpg')}
              />
              <Animated.View>
                <View style={styles.bar}>
                  <Text style={styles.title}>CovidIndia</Text>
                </View>
              </Animated.View>
            </Animated.View>

          </View>









        ) : (
            <View style={styles.splashScreen}>
              <Image
                style={styles.splashLogo}
                source={require('./assets/corona4.png')}
                // resizeMode="contain"
                // resizeMethod="resize"
              />
              <Text style={styles.splashText}>
                CovidIndia
              </Text>
              <Text style={styles.splashTextSmall}>
               loading ......
              </Text>

            </View>

          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:  "#0930EA"     
  },
  splashScreen: {
    flex: 1,
    backgroundColor: '#408ddb',
    flexDirection: 'column',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  splashLogo:{
    height: 150,
    width: 150,
    // resizeMode: 'contain' ,
//     alignSelf:"center",
//     justifyContent: 'center', 
// alignItems: 'center' 
  },
  splashText:{
    fontSize:30,
    alignSelf:"center",
    color:"white",
    // fontWeight:"600",
    // flexGrow:1,
    // justifyContent: 'center', 
    fontFamily:"monospace"
  },
  splashTextSmall:{
    fontSize:15,
    alignSelf:"center",
    color:"white",
    marginTop: 20,
    // justifyContent: 'center', 
    fontFamily:"monospace"
  },

  fill: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0655b2',
    overflow: 'hidden',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,

  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
});
