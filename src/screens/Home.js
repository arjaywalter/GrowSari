import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, FlatList, View, Text, Linking, SectionList, SafeAreaView, StatusBar, Button, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import TimeAgo from 'react-native-timeago';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { getProducts, addToCart } from '../store/reducers/productSlice';
import Colors from '../theme/colors';

function Home({ navigation, route }) {
  const dispatch = useDispatch();
  const {
    isFetching,
    isSuccess,
    isError,
    errorMessage,
    data,
  } = useSelector(state => state.product);

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('Categories');
  const [brand, setBrand] = useState('Brands');

  useEffect(() => {
    dispatch(getProducts({}));
  }, []);

  useEffect(() => {
    setAllProducts(data);
    setProducts(data);
  }, [data]);

  useEffect(() => {
    if (route.params?.selectedCategory) {
      // Category updated, do something with `route.params.selectedCategory`
      const selectedCategory = route.params.selectedCategory;
      setCategory(selectedCategory);
      const categoryProducts = allProducts.filter(product => product.category === selectedCategory);
      setProducts(categoryProducts)
    } else {
      setCategory('Categories');
      setProducts(allProducts);
    }
  }, [route.params?.selectedCategory]);

  const DATA = [
    {
      title: "Products",
      data: [...new Set(products)]
    },
  ];

  const keyExtractor = useCallback(item => item.id.toString(), []);

  const Item = ({ item }) => {
    const { id, display_name, barcode, price, brand, category } = item;

    return (<View style={styles.item}>
      <Text style={styles.title}>{display_name}</Text>
      <Text>PHP {price}</Text>
      <Button title="Add to cart" onPress={() => {
        dispatch(addToCart({id: item.id}));
      }}/>
    </View>
    )
  };

  const renderFilterHeader = () => (
    <View style={styles.listHeader}>
      <TouchableHighlight style={styles.filterButtonTouch} underlayColor={Colors.primary} onPress={() => { navigation.navigate('CategoriesModal') }}>
        <View style={styles.filterButtonTextContainer}>
          <Text style={styles.title}>{category}</Text>
          <Icon name="arrow-drop-down" size={24} color="black" />
        </View>
      </TouchableHighlight>

      <TouchableHighlight style={styles.filterButtonTouch} underlayColor={Colors.primary} onPress={() => { }}>
        <View style={styles.filterButtonTextContainer}>
          <Text style={styles.title}>{brand}</Text>
          <Icon name="arrow-drop-down" size={24} color="black" />
        </View>
      </TouchableHighlight>
    </View>
  )

  const renderList = () => (
    <SafeAreaView style={styles.container}>
      <SectionList
        ListHeaderComponent={renderFilterHeader}
        stickySectionHeadersEnabled={false}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, section }) => {
          return <FlatList
            // numColumns={2}
            // columnWrapperStyle={{
            //   flex: 1,
            //   justifyContent: "space-evenly"
            // }}
            data={section.data}
            renderItem={({ item }) => <Item item={item} />}
            showsHorizontalScrollIndicator={false}
          />;
        }}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
      />
    </SafeAreaView>

  );

  return renderList();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },
  listHeader: {
    flexDirection: 'row',
  },
  filterButtonTouch: {
    marginTop: 16,
    marginRight: 8,
    marginLeft: 8,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  filterButtonTextContainer: { flexDirection: 'row', alignItems: 'center', paddingLeft: 8, paddingRight: 8 },
  item: {
    padding: 8,
  },
  header: {
    color: Colors.primary,
    fontSize: 16,
    padding: 8,
    marginTop: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Home;
