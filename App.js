import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CameraPermission from './src/views/CameraPermission';
import NotificationsPermissions from './src/views/NotificationsPermissions';
import LocationPermissions from './src/views/LocationPermissions';
import { ThemeProvider } from 'react-native-magnus';
import Menu from './src/views/Menu';
const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator >
         
          <Stack.Screen
            name="CameraPermission"
            component={CameraPermission}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotificationsPermissions"
            component={NotificationsPermissions}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LocationPermissions"
            component={LocationPermissions}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="Menu"
            component={Menu}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
