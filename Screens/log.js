import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      if (savedUsername) {
        // If username is found in AsyncStorage, navigate to contacts screen
        navigation.navigate('choice', { username: savedUsername });
      }
    } catch (error) {
      console.error('Error reading username from AsyncStorage:', error);
    }
  };

  const handleLogin = () => {
    // Construct the URL with parameters
    const url = `https://mevn.in/apps/indeed/connectin/login.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  
    // Fetch data from the server
    fetch(url)
      .then(response => response.text()) // Get the raw text response
      .then(text => {
        // Remove any leading non-JSON content
        const startIndex = text.indexOf('{');
        const jsonResponse = JSON.parse(text.substring(startIndex));
        
        console.log('Response from server:', jsonResponse);
        if (jsonResponse.status === 'success') {
          // Save username to AsyncStorage
          AsyncStorage.setItem('username', username);
          // If login is successful, navigate to the next screen
          navigation.navigate('choice', { username: username });
        } else {
          // If login is unsuccessful, show an alert
          Alert.alert('Error', 'Invalid username or password.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred. Please try again.');
      });
  };
  
  const handleSignUp = () => {
    // Navigate to the register screen
    navigation.navigate('register');
  };

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          value={username}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.submitBtn} onPress={handleLogin}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>Don't have an account? <Text style={styles.signUpLink}>SignUp</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 30,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#495057',
  },
  submitBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 20,
    fontSize: 16,
    color: '#495057',
  },
  signUpLink: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default Login;