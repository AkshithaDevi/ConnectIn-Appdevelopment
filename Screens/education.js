import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const EducationForm = () => {
  const [school, setSchool] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [grade, setGrade] = useState('');
  const [description, setDescription] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getUsernameFromStorage();
  }, []);

  const getUsernameFromStorage = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } catch (error) {
      console.error('Error retrieving username from AsyncStorage:', error);
    }
  };

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleSubmit = () => {
    if (!school || !degree || !fieldOfStudy || !startDate || !endDate || !grade || !description) {
        // If any required field is empty, display an alert or perform any action you want
        alert('Please fill in all fields.');
        return; // Stop further execution
      }
    const url = 'https://mevn.in/apps/indeed/connectin/education.php';

    // Construct the query string with form data
    const queryString = `username=${encodeURIComponent(username)}&school=${encodeURIComponent(school)}&degree=${encodeURIComponent(degree)}&field_of_study=${encodeURIComponent(fieldOfStudy)}&start_date=${encodeURIComponent(startDate.toISOString().split('T')[0])}&end_date=${encodeURIComponent(endDate.toISOString().split('T')[0])}&grade=${encodeURIComponent(grade)}&description=${encodeURIComponent(description)}`;

    // Make the HTTP POST request
    fetch(`${url}?${queryString}`, {
      method: 'POST',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      // Navigate to the profile screen after successful submission
      navigation.navigate('profile');
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors if any
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Education</Text>
      <Text style={styles.usernameText}>Username: {username}</Text>
      <TextInput
        style={[styles.input, { height: 50 }]} // Increased height to 50
        placeholder="School"
        value={school}
        onChangeText={setSchool}
      />
      <TextInput
        style={[styles.input, { height: 50 }]} // Increased height to 50
        placeholder="Degree"
        value={degree}
        onChangeText={setDegree}
      />
      <TextInput
        style={[styles.input, { height: 50 }]} // Increased height to 50
        placeholder="Field of Study"
        value={fieldOfStudy}
        onChangeText={setFieldOfStudy}
      />
      <View style={styles.datePickerContainer}>
        <Button
          title={`Start Date: ${formatDate(startDate)}`}
          onPress={() => setShowStartDatePicker(true)}
          style={[styles.datePickerButton, { height: 50 }]} // Increased height to 50
          titleStyle={styles.buttonText}
        />
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={handleStartDateChange}
          />
        )}
      </View>
      <View style={styles.datePickerContainer}>
        <Button
          title={`End Date: ${formatDate(endDate)}`}
          onPress={() => setShowEndDatePicker(true)}
          style={[styles.datePickerButton, { height: 50 }]} // Increased height to 50
          titleStyle={styles.buttonText}
        />
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={handleEndDateChange}
          />
        )}
      </View>
      <TextInput
        style={[styles.input, { height: 50 }]} // Increased height to 50
        placeholder="Grade"
        value={grade}
        onChangeText={setGrade}
      />
      <TextInput
        style={[styles.descriptionInput, { height: 120 }]} // Increased height to 120
        placeholder="Description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
        style={[styles.submitButton, { height: 50 }]} // Increased height to 50
        titleStyle={styles.submitButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007bff',
  },
  input: {
    height: 40,
    borderColor: '#007bff',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#333',
  },
  datePickerContainer: {
    marginBottom: 10,
  },
  datePickerButton: {
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    borderColor: '#007bff',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007bff',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  usernameText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EducationForm;
