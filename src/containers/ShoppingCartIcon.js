import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons'

const ShoppingCartIcon = ({navigation}) => (
    <View style={[{ padding: 5 }, Platform.OS == 'android' ? styles.iconContainer : null]}>
        <View style={{
            position: 'absolute', height: 30, width: 30, borderRadius: 15, backgroundColor: '#F06B36', right: 15, bottom: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000,

        }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{99}</Text>
        </View>
        <Icon onPress={() => navigation.navigate('Cart')} name="ios-cart" size={30} color="white"/>
    </View>
)

export default (ShoppingCartIcon);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        paddingLeft: 20, paddingTop: 10, marginRight: 5
    }
});