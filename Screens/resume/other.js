import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtherScreen = () => {
  const [userId, setUserId] = useState(null);
  const [achievement1, setAchievement1] = useState('');
  const [achievement2, setAchievement2] = useState('');
  const [certification1, setCertification1] = useState('');
  const [certification2, setCertification2] = useState('');
  const [certification3, setCertification3] = useState('');
  const [languages, setLanguages] = useState('');
  const [interests, setInterests] = useState('');

  useEffect(() => {
    // Fetch data from the URL when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Retrieve user_id from AsyncStorage
      const storedUserId = await AsyncStorage.getItem('user_id');
      if (storedUserId !== null) {
        setUserId(storedUserId);
        
        // Fetch data from the URL with user_id
        const url = `https://mevn.in/apps/resume/retriveother.php?user_id=${storedUserId}`;
        const response = await fetch(url);
        const data = await response.json();
        
        // Update state with fetched data
        if (data.length > 0) {
          const {
            achievement_1,
            achievement_2,
            certification_1,
            certification_2,
            certification_3,
            languages,
            interests,
          } = data[0]; // Assuming you only expect one record
          setAchievement1(achievement_1 || '');
          setAchievement2(achievement_2 || '');
          setCertification1(certification_1 || '');
          setCertification2(certification_2 || '');
          setCertification3(certification_3 || '');
          setLanguages(languages || '');
          setInterests(interests || '');
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  // Function to send other data to server
  const sendOtherData = async () => {
    try {
      // Construct URL with parameters
      const url = `https://mevn.in/apps/resume/other.php?user_id=${userId}&achievement_1=${achievement1}&achievement_2=${achievement2}&certification_1=${certification1}&certification_2=${certification2}&certification_3=${certification3}&languages=${languages}&interests=${interests}`;

      // Send GET request to server
      const response = await fetch(url);

      // Handle response
      if (response.ok) {
        Alert.alert('Success', 'Other details saved successfully');
      } else {
        Alert.alert('Error', 'Failed to save other details');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while saving other details');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Other Details</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Achievement 1"
          multiline={true}
          numberOfLines={4}
          value={achievement1}
          onChangeText={text => setAchievement1(text)}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Achievement 2"
          multiline={true}
          numberOfLines={4}
          value={achievement2}
          onChangeText={text => setAchievement2(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Certification 1"
          value={certification1}
          onChangeText={text => setCertification1(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Certification 2"
          value={certification2}
          onChangeText={text => setCertification2(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Certification 3"
          value={certification3}
          onChangeText={text => setCertification3(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Languages"
          value={languages}
          onChangeText={text => setLanguages(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Interests"
          value={interests}
          onChangeText={text => setInterests(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={sendOtherData}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textArea: {
    width: '100%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top', // For Android
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default OtherScreen;
