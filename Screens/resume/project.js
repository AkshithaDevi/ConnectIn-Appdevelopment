import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProjectScreen = () => {
  const [projectName, setProjectName] = useState('');
  const [technologiesUsed, setTechnologiesUsed] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [description, setDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [userId, setUserId] = useState(null);

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

  // Function to send project data to server
  const sendProjectData = async () => {
    try {
      // Retrieve user_id from AsyncStorage
      await retrieveUserId();

      // Construct URL with parameters
      const url = `https://mevn.in/apps/resume/project.php?user_id=${userId}&project_name=${encodeURIComponent(projectName)}&technologies_used=${encodeURIComponent(technologiesUsed)}&team_size=${teamSize}&description=${encodeURIComponent(description)}&project_link=${encodeURIComponent(projectLink)}`;

      // Send GET request to server
      const response = await fetch(url);

      // Handle response
      if (response.ok) {
        Alert.alert('Success', 'Project details saved successfully');
      } else {
        Alert.alert('Error', 'Failed to save project details');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while saving project details');
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Project Details</Text>
      <Input
        placeholder="Project Name"
        value={projectName}
        onChangeText={text => setProjectName(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Technologies Used"
        value={technologiesUsed}
        onChangeText={text => setTechnologiesUsed(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Team Size"
        value={teamSize}
        onChangeText={text => setTeamSize(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Project Link"
        value={projectLink}
        onChangeText={text => setProjectLink(text)}
        containerStyle={styles.inputContainer}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={sendProjectData}
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
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProjectScreen;
