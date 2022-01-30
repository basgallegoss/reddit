import React, { memo, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, PermissionsAndroid, TouchableOpacity, BackHandler, Linking } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

const LocationPermissions = ({ navigation }) => {

    const [permisoNotificacion, setPermisoNotificacion] = useState('Allow');

    useEffect(() => {
        const interval = setInterval(() => {
            permisos()
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const permisos = async () => {
        try {
            if (Platform.OS === "android") {
                const userResponse = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                switch (userResponse) {
                    case "granted":
                        try {
                            setPermisoNotificacion('Enable')
                        } catch (err) {
                            console.log('error granted camara', err);
                        }
                        break;
                    case "never_ask_again":
                        try {
                            setPermisoNotificacion('Allow')
                        } catch (err) {
                            console.log('error never_ask_again camara', err);
                        }
                        break;
                    case "denied":
                        try {
                            setPermisoNotificacion('Allow')
                        } catch (err) {
                            console.log('error denied camara', err);
                        }
                        break;
                }
            }
        } catch (err) {
            Warning(err);
        }
        return null;
    }

    return (
        <View style={styles.background}>
            <Image
                style={styles.img}
                source={require('../aasets/location.png')}
            />
            <Text style={styles.title}>
            Enable location services We wants to access your location only to provide a better experience by helping you find new friends nearby.
            </Text>
            <TouchableOpacity onPress={() => {
                permisoNotificacion === "Allow"
                    ? Linking.openSettings()
                    : navigation.navigate('Menu')
            }}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#ff62a5', '#ff669e', '#ff6999', '#ff718c', '#ff7781', '#ff8c64', '#ff8c64']} style={styles.button}>
                    <Text style={styles.buttonText}>
                        {permisoNotificacion}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => BackHandler.exitApp()} >
                <Text style={styles.buttonCancel}>
                    Cancel
                </Text>
            </TouchableOpacity>
        </View>


    );
};
const styles = StyleSheet.create({
    img: {
        width: '60%',
        height: '30%',
        marginTop: '20%'
    },
    background: {
        backgroundColor: '#FFFF',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        width: '50%',
        marginTop: '20%'
    },
    button: {
        marginTop: '10%',
        padding: 10,
        borderRadius: 20,
        paddingStart: 70,
        paddingEnd: 70,
        marginBottom: '10%',
    },
    buttonText: {
        fontSize: 15,
        color: '#FFFF'
    },
    buttonCancel: {
        fontSize: 15,
        color: 'gray'
    }
});

export default memo(LocationPermissions);
