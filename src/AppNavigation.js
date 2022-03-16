import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { navigationRef } from './RootNavigation';
import * as RootNavigation from './RootNavigation';
import Colors from './theme/colors';
import Home from './screens/Home';
import Cart from './screens/Cart';
import CategoriesModal from './screens/CategoriesModal';
import ShoppingCartIcon from './containers/ShoppingCartIcon';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }}>
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Shop',
              headerLeft: () => (
                <Icon name="menu" size={24} color="white" onPress={() => alert('Clicked')} />
              ),
              headerRight: () => (
                <ShoppingCartIcon navigation={RootNavigation} />
              ),
            }}
          />

          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{
              headerBackTitle: '',
              headerRight: () => (
                <Icon name="qr-code-scanner" size={24} color="white" onPress={() => alert('Open Bar/QR Scanner')} />
              ),
            }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          {/* Add full screen modals here */}
          <Stack.Screen name="CategoriesModal" component={CategoriesModal} options={{
            headerLeft: () => (
              <Icon name="close" size={24} color="white" onPress={() => RootNavigation.goBack()} />
            ),
            title: 'Categories',
            headerBackTitle: '',
          }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
