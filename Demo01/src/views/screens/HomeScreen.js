import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../consts/colors';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import furnitures from '../../consts/furnitures';
const { width } = Dimensions.get('screen');

const HomeScreen = ({ navigation }) => {
  const categoryItems = [
    { name: 'Hoa Bo', iconName: '' },
    { name: 'Hoa Binh', iconName: '' },
    { name: 'Hoa Hop', iconName: '' },
    { name: 'Hoa Le', iconName: '' },
  ];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    callAPI();
  }, []);

  const callAPI = () => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        alert(error.message);
      })
      .finally(function () {
        console.log('Finally called');
      });
  };
  const ListCategories = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    return (
      <View style={style.categoriesContainer}>
        {categoryItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View
              style={[
                style.categoryItemBtn,
                {
                  backgroundColor:
                    selectedCategoryIndex == index
                      ? COLORS.deeppink
                      : COLORS.lightpink,
                },
              ]}>
              <Icon
                name={item.iconName}
                size={20}
                color={
                  selectedCategoryIndex == index ? COLORS.white : COLORS.primary
                }
              />
              <Text
                style={[
                  style.categoryText,
                  {
                    color:
                      selectedCategoryIndex == index
                        ? COLORS.white
                        : COLORS.primary,
                  },
                ]}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const navigateToProductDetail = (item) => {
    navigation.navigate('DetailsScreen', { item });
  };
  const Card = ({ item }) => {
    return (
      <Pressable
        onPress={() => navigateToProductDetail(item)}>
        <View style={style.card}>
          <Image
            source={{ uri: item.image }}
            style={{ height: 140, width: '60%', borderRadius: 10 }}
          />

          <Text style={style.cardName}>{item.title}</Text>
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={style.price}>{item.price}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="star" color={COLORS.yellow} size={18} />
              <Text style={style.rating}>4.3</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const PopularItemCard = ({ item }) => {
    return (
      <SafeAreaView onPress={() => navigateToProductDetail(item)}>
        <View style={style.popularItemCard}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: 120,
              height: '140%',
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
              marginRight: 15,
            }}
          />
          <View style={{ paddingVertical: 15, justifyContent: 'center' }}>
            <Text style={style.cardName}>{item.title}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={style.price}>{item.price}</Text>
              <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <Icon name="star" color={COLORS.yellow} size={18} />
                <Text style={style.rating}>4.3</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>

    );
  };
  const keyExtractor = (item, index) => index.toString();
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      {/* Header container */}
      <View style={style.header}>
        <Icon name="sort-variant" size={28} color={COLORS.primary} />
        <Icon onPress={() => navigation.navigate('Addtocart')} name="cart-outline" size={28} color={COLORS.primary} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={style.headerTitle}>CAI AO SHOP</Text>

        {/* Input and sort button container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <View style={style.searchInputContainer}>
            <Icon name="magnify" color={COLORS.mediumvioletred} size={25} />
            <TextInput placeholder="Search" />
          </View>

          <View style={style.sortBtn}>
            <Icon name="tune" color={COLORS.white} size={25} />
          </View>
        </View>

        <Text style={style.title}>Categories</Text>
        {/* Render categories */}
        <ListCategories />

        {/* Render To Furnitures */}
        <Text style={style.title}>Top Furniture</Text>

        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20 }}
          data={products}
          horizontal
          renderItem={Card}
          keyExtractor={keyExtractor}

        />

        {/* Render To Popular */}
        <Text style={style.title}>Popular</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20 }}
          data={products}
          renderItem={PopularItemCard}
          keyExtractor={keyExtractor}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontWeight: 'bold',
    paddingVertical: 20,
    color: COLORS.lightpink,
    fontSize: 30,
    width: '100%',
    lineHeight: 30,
    paddingHorizontal: 100,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.pink,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS.lightpink,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  categoryItemBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 5,
  },
  card: {
    height: 200,
    backgroundColor: COLORS.pink,
    elevation: 15,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
  },
  cardName: {
    marginTop: 10,
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  price: { fontWeight: 'bold', color: COLORS.primary, fontSize: 12 },
  rating: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20 },
  iconContainer: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    position: 'absolute',
    elevation: 2,
    right: 15,
    top: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularItemCard: {
    height: 100,
    width: width - 100,
    backgroundColor: COLORS.pink,
    elevation: 10,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
});
export default HomeScreen;