import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Country = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.text}>India</Text>
            </View>
            <View style={styles.bodyContainer} />
        </View>
    );
};

const styles = StyleSheet({
    container: {
        flex: 1,
        backgroundColor: '#f7b733'
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
    },
    text: {
        fontSize: 48,
        color: '#fff'
    }
});

export default Country;