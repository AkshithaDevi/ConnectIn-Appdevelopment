import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const EducationScreen = () => {
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve user_id from AsyncStorage when component mounts
    retrieveUserId();
  }, []);

  // Function to retrieve user_id from AsyncStorage
  const retrieveUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('user_id');
      if (storedUserId !== null) {
        setUserId(storedUserId);
      }
    } catch (error) {
      console.error('Error retrieving user_id:', error);
    }
  };

  // Function to send education data to server
  const sendEducationData = async () => {
    try {
      // Construct URL with parameters
      const url = `https://mevn.in/apps/resume/education.php?user_id=${userId}&degree=${degree}&institution=${institution}&duration=${duration}&location=${location}&cgpa=${cgpa}`;

      // Send POST request to server
      const response = await fetch(url, {
        method: 'GET'
      });

      // Handle response
      if (response.ok) {
        Alert.alert('Success', 'Education details saved successfully');
      } else {
        Alert.alert('Error', 'Failed to save education details');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while saving education details');
    }
  };

  // Function to fetch data based on selected degree
  const fetchData = async (selectedDegree) => {
    try {
      const response = await fetch(`https://mevn.in/apps/resume/retriveeducation.php?user_id=${userId}&degree=${selectedDegree}`);
      const data = await response.json();
      // If data is fetched successfully and it's not empty, populate the state variables
      if (Array.isArray(data) && data.length > 0) {
        const { institution, duration, location, cgpa } = data[0];
        setInstitution(institution);
        setDuration(duration);
        setLocation(location);
        setCgpa(cgpa);
      } else {
        // Clear input fields if no data is found for the selected degree
        setInstitution('');
        setDuration('');
        setLocation('');
        setCgpa('');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Education Details</Text>
      <Picker
        selectedValue={degree}
        onValueChange={(itemValue, itemIndex) => {
          setDegree(itemValue);
          fetchData(itemValue); // Fetch data when degree is selected
        }}
        style={styles.inputContainer}
      >
        <Picker.Item label="Select Degree" value="" />
        <Picker.Item label="10th" value="10th" />
        <Picker.Item label="Intermediate" value="Intermediate" />
        <Picker.Item label="Graduation" value="Graduation" />
      </Picker>
      <Input
        placeholder="Institution"
        value={institution}
        onChangeText={text => setInstitution(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Duration"
        value={duration}
        onChangeText={text => setDuration(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Location"
        value={location}
        onChangeText={text => setLocation(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="CGPA"
        value={cgpa}
        onChangeText={text => setCgpa(text)}
        containerStyle={styles.inputContainer}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={sendEducationData}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EducationScreen;
