import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";
import * as SecureStore from 'expo-secure-store'

interface AuthProps { 
    authState?:{token:string | null; authenticated: boolean | null};
    onRegister?:(email:string ,password : string) => Promise<any>;
    onLogin?: (email :string , password:string) => Promise<any>;
    onLogout?: () =>Promise<any>;

}

const TOKEN_KEY = 'jwt'
export const API_URL = "ip"
const AuthContext = createContext<AuthProps>({})

// export const useAuth = () => {
//     const context = useContext(AuthContext)
//     if(!context){
//         throw new Error('useAuth must be used within a AuthProvider')
//     }
//     return context
// }

export const AuthProvider = ({ children }: any) => {

    console.log("ddd");
    
    const [authState,setAuthState] = useState<{token:string | null; authenticated: boolean | null}>({
        token:null,
        authenticated:false
    })
    useEffect(() => {
        console.log("fff");
        
        const loadToken = async () => {
            console.log("mtavv");
            
            const token = await SecureStore.getItemAsync(TOKEN_KEY)
            if(token){
                // console.log(authState);
                
                setAuthState({
                    token,
                    authenticated:true
                })
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            }else{
                console.log(authState);

                setAuthState({
                    token:null,
                    authenticated:false
                })
            }
        }
        loadToken()
    },[])

    const register = async (email:string,password:string) => {
        try {
            return await axios.post(`${API_URL}/register`,{email,password})
        } catch (error) {
            return error.response
        }
    }
    const login = async (email:string,password:string) => {
        try {
            const result =  await axios.post(`${API_URL}/login`,{email,password})
            setAuthState({
                token:result.data.token,
                authenticated:true
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`
            await SecureStore.setItemAsync(TOKEN_KEY,result.data.token)
            return result
        } catch (error) {
            return error.response
        }
    }
    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY)
            setAuthState({
                token:null,
                authenticated:false
            })
            delete axios.defaults.headers.common['Authorization']

        } catch (error) {
            return error.response
        }
    }
    const value = {
        onRegister:register,
        onLogin:login,
        onLogout:logout,
        authState,
    }
    console.log(value);
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      console.log("useAuth() is returning undefined!"); // <-- Debugging
    }
    return context;
    

}