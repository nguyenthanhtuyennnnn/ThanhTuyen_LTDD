import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const ShoppingCart = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Product 1',
      image: require('./images/product1.jpg'),
      price: 10.99,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Product 2',
      image: require('./images/product2.jpg'),
      price: 19.99,
      quantity: 1,
    },
    // Thêm các sản phẩm khác vào đây
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Price: ${item.price}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 14,
  },
});

export default ShoppingCart;