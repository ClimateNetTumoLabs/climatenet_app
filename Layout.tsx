import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "./context/AuthContext";
import Login from "./Screens/Login";
import Products from "./Screens/Products";
import Register from "./Screens/Register";
import Connect from "./Screens/Connect";
import StartScreen from "./Screens/StartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";


const My_Stack = createNativeStackNavigator();

export const Layout = () =>{
  console.log("Layout is rendering...");

  const { authState } = useAuth();

  console.log("Auth State:", authState); // <-- Debugging

  return (
    <NavigationContainer>
      <My_Stack.Navigator>
        {authState?.authenticated ? (
          <My_Stack.Screen name="Connect" options={{headerShown : false}} component={Connect} />
        ) : (
            <>
            <My_Stack.Screen name="StartScreen" options={{ headerShown: false}} component={StartScreen} />
            <My_Stack.Screen name="LoginScreen" options={{ headerShown: false}} component={LoginScreen} />
            <My_Stack.Screen name="RegisterScreen" options={{ headerShown: false}} component={RegisterScreen} />
            <My_Stack.Screen name="Connect" component={Connect} />
          </>
        )}
      </My_Stack.Navigator>
    </NavigationContainer>
  );
}