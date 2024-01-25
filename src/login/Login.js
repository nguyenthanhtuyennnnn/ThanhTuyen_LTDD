



import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView, TextInput, Alert,Image } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Vui lòng nhập thông tin đầy đủ!');
    } else {
      try {
        const existingUserItems = await AsyncStorage.getItem('userItems');
        if (!existingUserItems) {
          Alert.alert('Không có tài khoản nào được tìm thấy. Xin mời đăng ký!');
          return;
        }

        const userItems = JSON.parse(existingUserItems);
        const existingUser = userItems.find(
          (item) => item.email === email && item.password === password
        );

        if (existingUser) {
          Alert.alert('Đăng nhập thành công!');
          // Navigate to the home screen or any other screen
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Email hoặc mật khẩu không hợp lệ!');
        }
      } catch (error) {
        console.log('Lỗi truy xuất tài khoản:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
     <ScrollView>
     <Image source={require('../assets/logo1.png')} style={styles.logo} />
      <View style={styles.content}>
        <Text style={styles.text}>Shop Aoo</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={(value) => setPassword(value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng Nhập</Text>
        </TouchableOpacity>
        <View style={styles.row}>
           <Text style={styles.text1}>Không có tài khoản?</Text>
           <TouchableOpacity onPress={() => navigation.navigate('Register')}>
           <Text style={styles.link}>Đăng ký</Text>
           </TouchableOpacity>
                    </View>
      </View>
     </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 25,
    marginLeft: 105,
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'pink',
    marginBottom:20,
    fontSize: 35,
    marginTop: 16,
  },
  text1: {
    color: 'pink',
    fontSize: 12,
    marginTop:20,
  },
  link: {
    color: 'pink',
    fontSize: 20,
    marginLeft: 35,
  },
  input: {
    color: 'gray',
    backgroundColor: '#ffff',
    margin: 10,
    borderRadius: 50,
    height: 70,
    width: '70%',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#ffc0cb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: '70%',
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;