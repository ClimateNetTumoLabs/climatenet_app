import { StyleSheet, View, Image, StatusBar, Text, Pressable, Alert, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import logo from '@/assets/images/pngwing.com.png';
import Input from '@/components/Input';
import Btn from '@/components/Btn';
import { loginAPI } from '@/Services/allAPI';
import { FormProvider, useForm } from 'react-hook-form';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const Login = ({ navigation }) => {
    const windowHeight = Dimensions.get('window').height;
    const formMethods = useForm();

    const handleLogin = (data) => {
        navigation.navigate("Connect");
    };

    return (
        <ScrollView contentContainerStyle={{ height: windowHeight }} showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor='black' />
            {/* <LinearGradient colors={["#000000", "#434343"]} style={styles.container}> */}
                {/* Logo Section */}
                <View style={styles.top}>
                    <Image source={logo} style={styles.logo} />
                </View>
                
                {/* Login Form */}
                <View style={styles.bottom}>
                    <Text style={styles.loginText}>Login</Text>
                    <View style={styles.form}>
                        <FormProvider {...formMethods}>
                            <Input label='Email' name='email' rules={{ required: 'Email cannot be empty!' }} />
                            <Input label='Password' name='password' rules={{ required: 'Password cannot be empty!' }} secureTextEntry />
                        </FormProvider>
                        <Btn title='Login' onPress={formMethods.handleSubmit(handleLogin)} />
                    </View>
                    <ThemedView style={styles.footer}>
                        <Pressable onPress={() => navigation.navigate("Register")}>
                            <ThemedText style={styles.signupText}>Don't have an account? Sign Up</ThemedText>
                        </Pressable>
                    </ThemedView>
                </View>
            {/* </LinearGradient> */}
        </ScrollView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 120,
        width: 120,
        resizeMode: 'contain',
    },
    bottom: {
        flex: 7,
        backgroundColor: '#ffffff',
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        paddingVertical: 40,
        paddingHorizontal: 30,
    },
    loginText: {
        color: '#333',
        fontSize: 35,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20,
    },
    form: {
        display: 'flex',
        rowGap: 20,
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
    },
    signupText: {
        color: '#007BFF',
        fontWeight: '600',
    },
});