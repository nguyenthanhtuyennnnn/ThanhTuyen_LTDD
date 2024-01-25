import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';
import { StatusBar } from 'react-native';
import COLORS from './src/consts/colors';
import Login from './src/login/Login';
import Register from './src/login/Register';
import Addtocart from './src/views/screens/Addtocart';
import Payment from './src/views/screens/Payment';
import { SearchProvider } from './src/views/screens/SearchContext';
const Stack = createStackNavigator();

const App = () => {
  return (
    <SearchProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Addtocart" component={Addtocart} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen name="Payment" component={Payment} />

        </Stack.Navigator>
      </NavigationContainer>
    </SearchProvider>

  );
};

export default App;