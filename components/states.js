import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    TouchableHighlight,
    Icon,
    Alert,
    ScrollView,
    ImageBackground
} from 'react-native';
import { COLORS } from './constant/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from "moment";
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import Intl from 'intl';
import 'intl';
import 'intl/locale-data/jsonp/en-IN';

const HEADER_MAX_HEIGHT = 300;
export default class States extends React.Component {
    constructor(props) {
        super(props);
        
    }
    // const States = ({ stateWiseData, countryData, worldData }) => {

    onPress() {
        this.props.refreshData()
    };
    
    render() {
        console.log("--------------------------------------------------",this.props.countryData.lastupdatedtime);
        console.log(moment(this.props.countryData.lastupdatedtime,'DD/MM/YYYY hh:mm:ss').format('DD-MM-YYYY'));
        if (!!this.props.stateWiseData && this.props.stateWiseData.length > 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.settingsCard}>
                        <View style={styles.settings}>
                            <Text style={styles.lastUpdated}>Updated at  {(!!this.props.countryData)?moment(this.props.countryData.lastupdatedtime,'DD/MM/YYYY hh:mm:ss').format('Do MMMM YYYY, h:mm a'): "0 mins ago"}</Text>
                            <TouchableOpacity style={styles.refreshButton} onPress={() => this.onPress()}>
                                <FontAwesome name='refresh' color="white" style={styles.icon} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    {/* Worldwide data */}
                    <View style={styles.card}>
                        <View style={styles.country}>
                            <View style={styles.countryContainer}>
                                <View style={styles.countryNameContainer}>
                                    <Text style={styles.countryName}>Worldwide</Text>
                                </View>
                                <View style={[styles.dataCard, { backgroundColor: COLORS.confirmed }]}>
                                    <Text style={styles.countryText}>{(!!this.props.worldData) ? new Intl.NumberFormat('en-IN').format(Number(this.props.worldData.total_cases)) : 0}</Text>
                                    <Text style={styles.textSmall}><FontAwesome5 name='arrow-up' color="white" style={styles.upArrow} />
                                        {(!!this.props.worldData) ? " " + new Intl.NumberFormat('en-IN').format(Number(this.props.worldData.total_new_cases_today)) : 0}
                                    </Text>
                                    <Text style={styles.countryTextSmall}> Confirmed</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    borderBottomColor: '#1f334e',
                                    borderBottomWidth: 2,
                                    borderRadius: 50,
                                    opacity: 0.5,
                                    marginHorizontal: 20
                                }}
                            />

                            <View style={styles.cardSubData}>
                                <View style={[styles.dataCard, { backgroundColor: COLORS.active }]}>
                                    <Text style={styles.countryText}>{(!!this.props.worldData) ? new Intl.NumberFormat('en-IN').format(Number(this.props.worldData.total_active_cases)) : 0}</Text>

                                    <Text style={[styles.countryTextSmall,{marginTop: 20}]}> Active</Text>
                                </View>
                                <View style={[styles.dataCard, { backgroundColor: COLORS.recovered }]}>
                                    <Text style={styles.countryText}>{(!!this.props.worldData) ? new Intl.NumberFormat('en-IN').format(Number(this.props.worldData.total_recovered)) : 0}</Text>
                                    <Text style={[styles.countryTextSmall,{marginTop: 20}]}> Recovered</Text>
                                </View>
                                <View style={[styles.dataCard, { backgroundColor: COLORS.deceased }]}>
                                    <Text style={styles.countryText}>{(!!this.props.worldData) ? new Intl.NumberFormat('en-IN').format(Number(this.props.worldData.total_deaths)) : 0}</Text>
                                    <Text style={styles.textSmall}><FontAwesome5 name='arrow-up' color="white" style={styles.upArrow} />
                                        {(!!this.props.worldData) ? " " + new Intl.NumberFormat('en-IN').format(Number(this.props.worldData.total_new_deaths_today)) : 0}
                                    </Text>
                                    <Text style={styles.countryTextSmall}> Deceased</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* India data */}
                    <View style={styles.card}>
                        <View style={styles.country}>
                            <View style={styles.countryContainer}>
                                <View style={styles.countryNameContainer}>
                                    <Text style={styles.countryName}>India</Text>
                                </View>
                                <View style={[styles.countryDataCard, { backgroundColor: COLORS.confirmed }]}>
                                    <Text style={styles.countryText}>{new Intl.NumberFormat('en-IN').format(Number(this.props.countryData.confirmed))}</Text>
                                    <Text style={styles.textSmall}><FontAwesome5 name='arrow-up' color="white" style={styles.upArrow} />
                                        {(!!this.props.countryData) ? " " + new Intl.NumberFormat('en-IN').format(Number(this.props.countryData.deltaconfirmed)) : 0}
                                    </Text>
                                    <Text style={styles.countryTextSmall}> Confirmed</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    borderBottomColor: '#1f334e',
                                    borderBottomWidth: 2,
                                    borderRadius: 50,
                                    opacity: 0.5,
                                    marginHorizontal: 20
                                }}
                            />

                            <View style={styles.cardSubData}>
                                <View style={[styles.countryDataCard, { backgroundColor: COLORS.active }]}>
                                    <Text style={styles.countryText}>{new Intl.NumberFormat('en-IN').format(Number(this.props.countryData.active))}</Text>
                                    <Text style={[styles.countryTextSmall, {marginTop:20}]}> Active</Text>
                                </View>
                                <View style={[styles.countryDataCard, { backgroundColor: COLORS.recovered }]}>
                                    <Text style={styles.countryText}>{new Intl.NumberFormat('en-IN').format(Number(this.props.countryData.recovered))}</Text>
                                    <Text style={styles.textSmall}><FontAwesome5 name='arrow-up' color="white" style={styles.upArrow} />
                                        {(!!this.props.countryData) ? " " + new Intl.NumberFormat('en-IN').format(Number(this.props.countryData.deltarecovered)) : 0}
                                    </Text>
                                    <Text style={styles.countryTextSmall}> Recovered</Text>
                                </View>
                                <View style={[styles.countryDataCard, { backgroundColor: COLORS.deceased }]}>
                                    <Text style={styles.countryText}>{new Intl.NumberFormat('en-IN').format(Number(this.props.countryData.deaths))}</Text>
                                    <Text style={styles.textSmall}><FontAwesome5 name='arrow-up' color="white" style={styles.upArrow} />
                                        {(!!this.props.countryData) ? " " + new Intl.NumberFormat('en-IN').format(Number(this.props.countryData.deltadeaths)) : 0}
                                    </Text>
                                    <Text style={styles.countryTextSmall}> Deceased</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    borderBottomColor: '#1f334e',
                                    borderBottomWidth: 2,
                                    borderRadius: 50,
                                    opacity: 0.5,
                                    marginHorizontal: 20
                                }}
                            />


                            <View style={styles.state}>
                                <Text style={styles.stateName}><FontAwesome5 name='calendar-day' color="COLOR.deceased" style={{fontSize:16}} /> {((!!this.props.yesterdayCountryData)?" "+this.props.yesterdayCountryData.date + " 2020": " ")} </Text>
                                <View style={styles.cardSubData}>
                                    <View style={[styles.dataCard, { backgroundColor: COLORS.confirmed }]}>
                                        <Text style={styles.text}><FontAwesome5 name='arrow-up' color="white" style={styles.upArrow} />{(!!this.props.yesterdayCountryData)?" " + new Intl.NumberFormat('en-IN').format(Number(this.props.yesterdayCountryData.dailyconfirmed)):0}</Text>
                                        <Text style={styles.textExtraSmall}> Confirmed</Text>
                                    </View>
                                    <View
                                        style={{
                                            borderRightColor: '#1f334e',
                                            borderRightWidth: 2,
                                            borderRadius: 50,
                                            opacity: 0.5,
                                            marginVertical: 15
                                        }}
                                    />
                                    <View style={[styles.dataCard, { backgroundColor: COLORS.recovered }]}>
                                        <Text style={styles.text}><FontAwesome5 name='arrow-up' color="white" style={styles.upArrow} />{(!!this.props.yesterdayCountryData)?" " + new Intl.NumberFormat('en-IN').format(Number(this.props.yesterdayCountryData.dailyrecovered)):0}</Text>
                                        <Text style={styles.textExtraSmall}> Recovered</Text>
                                    </View>
                                    <View
                                        style={{
                                            borderRightColor: '#1f334e',
                                            borderRightWidth: 2,
                                            borderRadius: 50,
                                            opacity: 0.5,
                                            marginVertical: 15
                                        }}
                                    />
                                    <View style={[styles.dataCard, { backgroundColor: COLORS.deceased }]}>
                                        <Text style={styles.text}><FontAwesome5 name='arrow-up' color="white" style={styles.upArrow} />{(!!this.props.yesterdayCountryData)?" " + new Intl.NumberFormat('en-IN').format(Number(this.props.yesterdayCountryData.dailydeceased)):0}</Text>
                                        <Text style={styles.textExtraSmall}> Deceased</Text>
                                    </View>
                                </View>
                            </View>



                        </View>
                    </View>
                    <View style={styles.settingsCard}>
                        <View style={styles.settings}>
                            <Text style={styles.lastUpdated}> India </Text>
                        </View>
                    </View>
                    <FlatList
                        // style={styles.contentList}
                        data={this.props.stateWiseData}
                        keyExtractor={(item) => {
                            return item.state;
                        }}
                        renderItem={({ item }) => {
                            console.log(item.state)
                            return (
                                <View style={styles.card}>
                                    <View style={styles.state}>
                                        <Text style={styles.stateName}>{item.state}</Text>
                                        <View style={styles.cardSubData}>
                                            <View style={[styles.dataCard, { backgroundColor: COLORS.confirmed }]}>
                                                <Text style={styles.text}>{new Intl.NumberFormat('en-IN').format(Number(item.confirmed))}</Text>
                                                <Text style={styles.textSmall}><FontAwesome5 name='arrow-up' color="white" style={styles.upArrow} />
                                                    {(!!item) ? " " + new Intl.NumberFormat('en-IN').format(Number(item.deltaconfirmed)) : 0}
                                                </Text>
                                                <Text style={styles.textExtraSmall}> Confirmed</Text>
                                            </View>
                                            <View
                                                style={{
                                                    borderRightColor: '#1f334e',
                                                    borderRightWidth: 2,
                                                    borderRadius: 50,
                                                    opacity: 0.5,
                                                    marginVertical: 15,
                                                    marginHorizontal: 2
                                                }}
                                            />
                                            <View style={[styles.dataCard, { backgroundColor: COLORS.active }]}>
                                                <Text style={styles.text}>{new Intl.NumberFormat('en-IN').format(Number(item.active))}</Text>
                                                <Text style={[styles.textExtraSmall, {marginTop:20}]}> Active</Text>
                                            </View>
                                            <View
                                                style={{
                                                    borderRightColor: '#1f334e',
                                                    borderRightWidth: 2,
                                                    borderRadius: 50,
                                                    opacity: 0.5,
                                                    marginVertical: 15,
                                                    marginHorizontal: 2
                                                }}
                                            />
                                            <View style={[styles.dataCard, { backgroundColor: COLORS.recovered }]}>
                                                <Text style={styles.text}>{new Intl.NumberFormat('en-IN').format(Number(item.recovered))}</Text>
                                                <Text style={styles.textSmall}><FontAwesome5 name='arrow-up' color="white" style={styles.upArrow} />
                                                    {(!!item) ? " " + new Intl.NumberFormat('en-IN').format(Number(item.deltarecovered)) : 0}
                                                </Text>
                                                <Text style={styles.textExtraSmall}> Recovered</Text>
                                            </View>
                                            <View
                                                style={{
                                                    borderRightColor: '#1f334e',
                                                    borderRightWidth: 2,
                                                    borderRadius: 50,
                                                    opacity: 0.5,
                                                    marginVertical: 15,
                                                    marginHorizontal: 2
                                                }}
                                            />
                                            <View style={[styles.dataCard, { backgroundColor: COLORS.deceased }]}>
                                                <Text style={styles.text}>{new Intl.NumberFormat('en-IN').format(Number(item.deaths))}</Text>
                                                <Text style={styles.textSmall}><FontAwesome5 name='arrow-up' color="white" style={styles.upArrow} />
                                                    {(!!item) ? " " + new Intl.NumberFormat('en-IN').format(Number(item.deltadeaths)) : 0}
                                                </Text>
                                                <Text style={styles.textExtraSmall}> Deceased</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        }} />
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        marginTop: HEADER_MAX_HEIGHT,
        paddingTop: 10,

    },

    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.27,
        shadowRadius: 5.49,
        elevation: 5,
        marginHorizontal: 20,
        marginVertical: 5,
        backgroundColor: COLORS.cardPrimary,
        flexDirection: 'row',
        borderRadius: 15,
    },
    settingsCard: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.27,
        shadowRadius: 5.49,
        elevation: 5,
        marginHorizontal: 20,
        marginVertical: 5,
        backgroundColor: COLORS.setting,
        flexDirection: 'row',
        borderRadius: 5,
    },
    icon: {
        fontSize: 20,
        textAlign: "center"

    },
    upArrow: {
        fontSize: 12,
    },
    refreshButton: {
        backgroundColor: COLORS.setting
    },

    settings: {
        flex: 1,
        flexDirection: "row",
        padding: 10
    },
    lastUpdated: {
        flex: 2,
        fontSize: 16,
        fontWeight: "700",
        color: "white",
        textAlign: "left"
    },

    // country css
    country: {
        flex: 1,
        flexDirection: "column",
    },

    countryContainer: {
        flex: 1,
        flexDirection: "row",
    },
    countryNameContainer: {
        flex: 2,
    },
    countryName: {
        fontSize: 26,
        color: COLORS.cardHeading,
        fontWeight: "700",
        textAlign: "left",
        marginLeft: 15,
        opacity: 0.9,
        // fontFamily: "serif"
    },
    countryText: {
        fontSize: 18,
        color: "white",
        fontWeight: "700",
        textAlign: "center"
    },
    countryTextSmall: {
        fontSize: 14,
        color: "white",
        fontWeight: "700",
        textAlign: "center",
        opacity: 0.9,
    },
    countryDataCard: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        margin: 10,
        borderRadius: 10,
        padding: 5,
        flex: 1,
        flexDirection: "column",

    },

    //  state list css

    state: {
        flex: 1,
        flexDirection: "column",
    },
    stateName: {
        fontSize: 18,
        color: COLORS.cardHeading,
        fontWeight: "700",
        textAlign: "center",
        opacity: 0.9,
        // fontFamily: "sans-serif-condensed"
    },
    cardSubData: {
        flex: 1,
        flexDirection: "row",
    },
    dataCard: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        margin: 10,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
        flex: 1,
        flexDirection: "column",

    },

    text: {
        fontSize: 16,
        color: "white",
        fontWeight: "700",
        textAlign: "center"
    },
    textSmall: {
        fontSize: 14,
        color: "white",
        fontWeight: "700",
        textAlign: "center",
        // opacity: 0.9,
    },
    textExtraSmall: {
        fontSize: 12,
        color: "white",
        fontWeight: "700",
        textAlign: "center",
        opacity: 0.9,
    }
});

// export default States;