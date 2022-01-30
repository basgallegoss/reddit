import React, { memo, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, PermissionsAndroid, TouchableOpacity, BackHandler, Linking } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

const CameraPermission = ({ navigation }) => {

  const [permisoCamara, setPermisoCamara] = useState('Allow');

  useEffect(() => {
    const interval = setInterval(() => {
      permisos()
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const permisos = async () => {
    try {
      if (Platform.OS === "android") {
        const userResponse = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        switch (userResponse) {
          case "granted":
            try {
              setPermisoCamara('Enable')
            } catch (err) {
              console.log('error granted camara', err);
            }
            break;
          case "never_ask_again":
            try {
              setPermisoCamara('Allow')
            } catch (err) {
              console.log('error never_ask_again camara', err);
            }
            break;
          case "denied":
            try {
              setPermisoCamara('Allow')
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
        source={require('../aasets/camera.png')}
      />
      <Text style={styles.title}>
        Camera Access
        Please allow access to your camera to take photos.
      </Text>
      <TouchableOpacity onPress={() => {
        permisoCamara === "Allow"
          ? Linking.openSettings()
          : navigation.navigate('NotificationsPermissions')
      }}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#ff62a5', '#ff669e', '#ff6999', '#ff718c', '#ff7781', '#ff8c64', '#ff8c64']} style={styles.button}>
          <Text style={styles.buttonText}>
            {permisoCamara}
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
    fontSize: 20,
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

export default memo(CameraPermission);
