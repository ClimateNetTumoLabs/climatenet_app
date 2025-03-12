import { StyleSheet, Text, View, StatusBar, Pressable, Alert, ScrollView, Dimensions } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Input from '@/components/Input';
import Btn from '@/components/Btn';
import { registerAPI } from '@/Services/allAPI';
import { FormProvider, useForm } from 'react-hook-form';

const Register = ({ navigation }) => {
    const handleRegister = async (data) => {
        const response = await registerAPI(data);
        if (response.status === 200) {
            Alert.alert('Registered successfully');
            navigation.navigate('Login');
        } else {
            Alert.alert('Something went wrong!');
        }
    };

    const windowHeight = Dimensions.get('window').height;
    const formMethods = useForm();

    return (
        <ScrollView contentContainerStyle={{ height: windowHeight }} showsVerticalScrollIndicator={false}>
            {/* <LinearGradient colors={["#000000", "#434343"]} style={styles.container}> */}
                <StatusBar backgroundColor='black' />
                {/* Top Section */}
                <View style={styles.top}>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <Icons name='arrowleft' size={35} color="white" style={styles.backIcon} />
                    </Pressable>
                    <Text style={styles.signUpText}>Sign Up</Text>
                </View>
                {/* Bottom Section */}
                <View style={styles.bottom}>
                    {/* Form */}
                    <View style={styles.form}>
                        <FormProvider {...formMethods}>
                            <Input label='Name' name='name' rules={{ required: 'Name cannot be empty!' }} />
                            <Input label='Email' name='email' rules={{ required: 'Email cannot be empty!' }} />
                            <Input label='Phone Number' name='phoneNumber' rules={{ required: 'Phone Number cannot be empty!' }} />
                            <Input label='Password' name='password' rules={{ required: 'Password cannot be empty!' }} secureTextEntry />
                            <Input label='Confirm Password' name='confirmPassword' rules={{ required: 'Confirm Password cannot be empty!' }} secureTextEntry />
                        </FormProvider>
                    </View>
                    {/* Button */}
                    <View style={styles.footer}>
                        <Btn title='Sign Up' onPress={formMethods.handleSubmit(handleRegister)} />
                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.loginText}>Already have an account? Log In</Text>
                        </Pressable>
                    </View>
                </View>
            {/* </LinearGradient> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    backIcon: {
        marginRight: 15,
    },
    signUpText: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
    },
    bottom: {
        flex: 8.5,
        backgroundColor: '#ffffff',
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        paddingVertical: 40,
        paddingHorizontal: 30,
    },
    form: {
        rowGap: 20,
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginText: {
        color: '#007BFF',
        fontSize: 15,
        marginTop: 15,
        textAlign: 'center',
    },
});

export default Register;