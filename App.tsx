import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {  AuthProvider, useAuth } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screens/Login';
import Products from './Screens/Products';
import { Layout } from './Layout';






export default function App() {
  // console.log("ggg");
  
  return (
    // <AuthProvider>
      <AuthProvider>
        <Layout/>
      </AuthProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
