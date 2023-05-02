import { NavigationContainer,createAppContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './src/Screens/HomeScreen'
import AccountsScreen from './src/Screens/AccountsScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
import SearchScreen from './src/Screens/SearchScreen';
import UploadIdeas from './src/Components/UploadIdeas';
import DecoratorProfile from './src/Components/DecoratorProfile';
import SignInScreen from './src/Screens/SignInScreen';
import ProductExploring from './src/Screens/ProductExploring';
import PostQueryScreen from './src/Screens/PostQueryScreen';
import ViewProductSellerProfile from './src/Screens/ViewProductSellerProfile';
import FavoriteScreen from './src/Screens/FavoriteScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
    <Stack.Navigator 
    initialRouteName='SearchScreen'
    screenOptions={{ headerShown: false }}
    >
    <Stack.Screen name='HomeScreen' component={HomeScreen}/>
    <Stack.Screen name='AccountScreen' component={AccountsScreen}/>
    <Stack.Screen name='SignUpScreen' component={SignUpScreen}/>
    <Stack.Screen name='SignInScreen' component={SignInScreen}/>
    <Stack.Screen name='SearchScreen' component={SearchScreen}/>
    <Stack.Screen name='UploadIdeas' component={UploadIdeas}/>
    <Stack.Screen name='DecoratorProfile' component={DecoratorProfile}/>
    <Stack.Screen name='ProductExploring' component={ProductExploring}/>
    <Stack.Screen name='PostQueryScreen' component={PostQueryScreen}/>
    <Stack.Screen name='ViewProductSellerProfile' component={ViewProductSellerProfile}/>
    <Stack.Screen name='FavoriteScreen' component={FavoriteScreen}/>
    

    </Stack.Navigator>
    </NavigationContainer>
  )
}



export default App

