import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewEducation = () => {
  const [educationData, setEducationData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getUsername();
    fetchData();
  }, []);

  const getUsername = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      // Handle the case where username is null or undefined
      // For example, you can set a default username if it's not found in AsyncStorage
      // const defaultUsername = 'defaultUsername';
      // const usernameOrDefault = username || defaultUsername;
      fetchData(username);
    } catch (error) {
      console.error('Error getting username from AsyncStorage:', error);
    }
  };

  const fetchData = async (username) => {
    try {
      const response = await fetch(`https://mevn.in/apps/indeed/connectin/fetchEducation.php?username=${username}`);
      const data = await response.json();
      setEducationData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateTimeDifference = (startDate) => {
    const currentDate = new Date();
    const diff = currentDate - new Date(startDate);
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    return `${years} years, ${months} months`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <MaterialCommunityIcons name="school" size={24} color="#4CAF50" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.school}</Text>
        <Text>{`Degree: ${item.degree}`}</Text>
        <Text>{`Field of Study: ${item.field_of_study}`}</Text>
        <Text>{`Start Date: ${item.start_date}`}</Text>
        <Text>{`End Date: ${item.end_date}`}</Text>
        <Text>{`Time Since Start Date: ${calculateTimeDifference(item.start_date)}`}</Text>
        <Text>{`Grade: ${item.grade}`}</Text>
        <Text>{`Description: ${item.description}`}</Text>
      </View>
    </View>
  );

  const handleNavigateToEducation = () => {
    navigation.navigate('education'); 
  };

  return (
    <View style={styles.container}>
      <Button title="Add Education" onPress={handleNavigateToEducation} />
      <FlatList
        data={educationData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 20,
  },
  item: {
    backgroundColor: '#E8F5E9', // Light green background
    padding: 20,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#388E3C', // Dark green text color
  },
});

export default ViewEducation;
