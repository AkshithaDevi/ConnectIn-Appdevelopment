import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import DatePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    retrieveUserId();
  }, []);

  const retrieveUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('user_id');
      if (storedUserId !== null) {
        setUserId(storedUserId);
        // Fetch user details based on user_id
        fetchUserData(storedUserId);
      }
    } catch (error) {
      console.error('Error retrieving user_id:', error);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`https://mevn.in/apps/resume/details.php?user_id=${userId}`);
      if (response.ok) {
        const userData = await response.json();
        if (userData.length > 0) {
          const user = userData[0];
          setName(user.name);
          setEmail(user.email);
          setPhone(user.phone);
          setLocation(user.location);
          setDob(new Date(user.dob));
        }
      } else {
        Alert.alert('Error', 'Failed to fetch user data from the server');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while fetching user data from the server');
    }
  };

  const sendDataToServer = async () => {
    try {
      // Format dob to 'YYYY-MM-DD' string
      const formattedDob = `${dob.getFullYear()}-${dob.getMonth() + 1}-${dob.getDate()}`;
      
      const response = await fetch(`https://mevn.in/apps/resume/index.php?user_id=${userId}&name=${name}&email=${email}&phone=${phone}&location=${location}&dob=${formattedDob}`, {
        method: 'GET'
      });
  
      if (response.ok) {
        Alert.alert('Success', 'Data sent successfully');
      } else {
        Alert.alert('Error', 'Failed to send data to the server');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while sending data to the server');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setShowDatePicker(false);
      setDob(selectedDate);
    } else {
      setShowDatePicker(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Personal Details</Text>
      <Input
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Phone"
        value={phone}
        onChangeText={text => setPhone(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Location"
        value={location}
        onChangeText={text => setLocation(text)}
        containerStyle={styles.inputContainer}
      />
      <View style={styles.datePickerContainer}>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateButtonText}>Select Date of Birth</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DatePicker
            value={dob}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />        
        )}
        <Text style={styles.selectedDate}>{dob.toDateString()}</Text>
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={sendDataToServer}
        disabled={!userId} // Disable the button if userId is null
      >
        <Text style={styles.submitButtonText}>Save</Text>
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
  datePickerContainer: {
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  dateButton: {
    backgroundColor: 'rgba(200, 200, 200, 0.6)',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    width: '100%',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedDate: {
    marginTop: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DetailsScreen;
