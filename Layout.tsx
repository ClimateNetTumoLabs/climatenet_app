import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "./context/AuthContext";
import Login from "./Screens/Login";
import Products from "./Screens/Products";
import Register from "./Screens/Register";
import Connect from "./Screens/Connect";


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
            <My_Stack.Screen name="Connect" component={Connect} />
            <My_Stack.Screen name="Login" options={{ headerShown: false}} component={Login} />
            <My_Stack.Screen name="Register" options={{ headerShown: false}} component={Register} />
          </>
        )}
      </My_Stack.Navigator>
    </NavigationContainer>
  );
}