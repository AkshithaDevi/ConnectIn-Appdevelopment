import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 icon library

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Build Your Resume</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('r_details')}
      >
        <FontAwesome5 name="user" size={24} color="#007bff" />
        <Text style={styles.buttonText}>Details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('r_education')}
      >
        <FontAwesome5 name="graduation-cap" size={24} color="#007bff" />
        <Text style={styles.buttonText}>Education</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('r_skills')}
      >
        <FontAwesome5 name="code" size={24} color="#007bff" />
        <Text style={styles.buttonText}>Skills</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('r_project')}
      >
        <FontAwesome5 name="project-diagram" size={24} color="#007bff" />
        <Text style={styles.buttonText}>Projects</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('r_other')}
      >
        <FontAwesome5 name="tasks" size={24} color="#007bff" />
        <Text style={styles.buttonText}>Other</Text>
      </TouchableOpacity>

      {/* View Resume button */}
      <TouchableOpacity
        style={styles.viewResumeButton}
        onPress={() => navigation.navigate('r_view')}
      >
        <FontAwesome5 name="file-alt" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    position: 'relative', // Required for absolute positioning
  },
  heading: {
    fontSize: 32, // Larger font size
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff', // Different color
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // Text shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  button: {
    flexDirection: 'row', // Align icon and text horizontally
    backgroundColor: '#f8f9fa', // Light background color
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center', // Center items vertically
    justifyContent: 'flex-start', // Align items to the start
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
  },
  viewResumeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#28a745',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
