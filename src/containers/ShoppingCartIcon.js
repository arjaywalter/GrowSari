import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash';

import { useSelector, useDispatch } from 'react-redux';

const ShoppingCartIcon = ({ navigation }) => {
    const { cart } = useSelector(state => state.product);
    console.log('cart', cart);
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <View style={[{ padding: 5 }, Platform.OS == 'android' ? styles.iconContainer : null]}>
                {!_.isEmpty(cart) && <View style={{
                    position: 'absolute', height: 30, width: 30, borderRadius: 15, backgroundColor: '#F06B36', right: 15, bottom: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000,

                }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{cart.length}</Text>
                </View>}
                <Icon name="ios-cart" size={30} color="white" />
            </View>
        </TouchableOpacity>
    )
}

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