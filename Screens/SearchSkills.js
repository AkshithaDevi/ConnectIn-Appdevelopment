import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Skills = () => {
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [searchUser, setSearchUser] = useState('');

  useEffect(() => {
    getSearchUserFromStorage();
  }, []);

  useEffect(() => {
    if (searchUser !== '') {
      fetchSkills();
    }
  }, [searchUser]);

  const getSearchUserFromStorage = async () => {
    try {
      const storedSearchUser = await AsyncStorage.getItem('search_user'); // Get search_user from AsyncStorage
      if (storedSearchUser) {
        setSearchUser(storedSearchUser);
      }
    } catch (error) {
      console.error('Error retrieving search_user from AsyncStorage:', error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await fetch(`https://mevn.in/apps/indeed/connectin/fetchSkills.php?username=${searchUser}`);
      console.log("Fetching skills for user:", searchUser); // Add this console log statement
      const data = await response.json();
      console.log("Skills data:", data);
      if (data && Array.isArray(data)) {
        const uniqueSkills = data.filter((skill, index) => skill !== "" && data.indexOf(skill) === index);
        setSkills(uniqueSkills);
      } else {
        console.error('Invalid skills data format:', data);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://mevn.in/apps/indeed/connectin/skills.php?username=${searchUser}&skill=${encodeURIComponent(skill)}`);
      // Handle response as needed
      setSkill('');
      // After submitting the skill successfully, refresh the skills
      fetchSkills();
    } catch (error) {
      console.error('Error submitting skill:', error);
    }
  };

  const renderSkillItem = ({ item }) => (
    <View style={styles.skillCard}>
      <Text style={styles.skillText}>{item}</Text>
    </View>
  );

  console.log("searchUser value:", searchUser); // Print searchUser value to console

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Skill"
          value={skill}
          onChangeText={text => setSkill(text)}
        />
        <Button
          title="Submit"
          onPress={handleSubmit}
        />
        <View style={styles.skillListContainer}>
          <Text style={styles.skillListHeading}>Skills:</Text>
          <FlatList
            data={skills}
            renderItem={renderSkillItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#dcedc8', // Light green background color
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  skillListContainer: {
    marginTop: 20,
  },
  skillListHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  skillCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  skillText: {
    fontSize: 16,
  },
});

export default Skills;
