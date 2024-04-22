import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';

const SkillForm = () => {
  const [userId, setUserId] = useState('');
  const [programmingLanguages, setProgrammingLanguages] = useState('');
  const [frontend, setFrontend] = useState('');
  const [backend, setBackend] = useState('');

  useEffect(() => {
    // Retrieve user_id from AsyncStorage when component mounts
    retrieveUserId();
    // Fetch data from the server when component mounts
    fetchData();
  }, []);

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

  const fetchData = async () => {
    try {
      // Fetch data from the server using the stored user_id
      const storedUserId = await AsyncStorage.getItem('user_id');
      if (storedUserId !== null) {
        const url = `https://mevn.in/apps/resume/retriveskills.php?user_id=${storedUserId}`;
        const response = await fetch(url);
        const data = await response.json();
        // If data is fetched successfully and it's not empty, populate the state variables
        if (Array.isArray(data) && data.length > 0) {
          const { programming_languages, frontend, backend } = data[0];
          setProgrammingLanguages(programming_languages);
          setFrontend(frontend);
          setBackend(backend);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  const handleSubmit = async () => {
    // Construct URL with query parameters
    const url = `https://mevn.in/apps/resume/skills.php?user_id=${userId}&programming_languages=${programmingLanguages}&frontend=${frontend}&backend=${backend}`;

    try {
      // Send GET request to backend
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        console.log('Data inserted successfully:', data);
        // Show success message to user
        Alert.alert('Success', 'Skill data inserted successfully!');
      } else {
        console.error('Error inserting skill data:', data.error);
        // Show error message to user
        Alert.alert('Error', 'Failed to insert skill data. Please try again.');
      }
    } catch (error) {
      console.error('Error inserting skill data:', error);
      // Show error message to user
      Alert.alert('Error', 'Failed to insert skill data. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Enter Your Skills</Text>
      <Input
        placeholder="Programming Languages"
        value={programmingLanguages}
        onChangeText={setProgrammingLanguages}
      />
      <Input
        placeholder="Frontend Skills"
        value={frontend}
        onChangeText={setFrontend}
      />
      <Input
        placeholder="Backend Skills"
        value={backend}
        onChangeText={setBackend}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
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
    margin: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    width:'100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SkillForm;
