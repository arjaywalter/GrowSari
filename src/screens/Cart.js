import React from 'react';
import { StyleSheet, FlatList, View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeToCart } from '../store/reducers/productSlice';

function Cart({ navigation }) {
  const dispatch = useDispatch();
  const {
    cart,
  } = useSelector(state => state.product);

  const Item = ({ item }) => {
    const { id, display_name, barcode, price, brand, category } = item;
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{display_name}</Text>
        <Text>PHP {price}</Text>
        <Button title="Remove to cart" onPress={() => {
          dispatch(removeToCart({ id: item.id }));
        }} />
      </View>
    )
  };

  return (
    <FlatList
      style={{ padding: 8 }}
      data={cart}
      renderItem={({ item }) => <Item item={item} />}
      showsHorizontalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  base: {},
});

export default Cart;
