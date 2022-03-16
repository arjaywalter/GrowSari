import React from 'react';
import { StyleSheet, TouchableOpacity, Text, FlatList, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

function CategoriesModal({ navigation }) {
  const { data } = useSelector(state => state.product);
  const allCategories = data.map(product => product.category);
  const categories = [...new Set(allCategories)];
  categories.unshift("All categories");

  return (
    <SafeAreaView>
      <FlatList
        data={categories}
        renderItem={({ item, index }) => <TouchableOpacity onPress={() => {
          navigation.navigate({
            name: 'Home',
            params: { selectedCategory: index === 0 ? '' : item },
            merge: true,
          })
        }}>
          <Text style={{ padding: 8 }}>{item}</Text>
        </ TouchableOpacity>}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  base: {},
});

export default CategoriesModal;
