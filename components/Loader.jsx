import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="black" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

