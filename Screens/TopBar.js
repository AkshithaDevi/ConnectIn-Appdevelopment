import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from '@react-navigation/native';

const TopBar = () => {
  const navigation = useNavigation(); // Access the navigation object
  const [searchText, setSearchText] = useState(''); // State to store search text
  const [storedSearch, setStoredSearch] = useState(''); // State to store retrieved search from AsyncStorage

  useEffect(() => {
    // Function to retrieve stored search term from AsyncStorage
    const getStoredSearch = async () => {
      try {
        const search = await AsyncStorage.getItem('search_user');
        if (search !== null) {
          setStoredSearch(search);
        }
      } catch (error) {
        console.log("Error retrieving search term:", error);
        // Handle error if AsyncStorage getItem fails
      }
    };

    getStoredSearch(); // Call the function when component mounts
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleContactPress = () => {
    navigation.navigate('contacts'); // Navigate to the 'Contact' screen
  };

  const handleProfilePress = () => {
    navigation.navigate('profile'); // Navigate to the 'Profile' screen
  };

  const handleSearchSubmit = async () => { // Make the function asynchronous
    if (searchText.trim() !== '') {
      try {
        await AsyncStorage.setItem('search_user', searchText.trim()); // Store searchText in AsyncStorage
        navigation.navigate('search', { username: searchText.trim() }); // Navigate to Search screen with username
        setSearchText(''); // Clear the search input
      } catch (error) {
        console.log("Error storing search term:", error);
        // Handle error if AsyncStorage setItem fails
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Wrap the Image component inside TouchableOpacity for click handling */}
      <TouchableOpacity style={styles.icon} onPress={handleProfilePress}>
        <Image
          source={{ uri: 'https://mevn.in/apps/indeed/connectin/uploads/Hiio.jpg' }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#ccc"
        value={searchText}
        onChangeText={text => setSearchText(text)}
        onSubmitEditing={handleSearchSubmit} // Handle submission when 'Enter' is pressed
      />
      <TouchableOpacity style={styles.icon} onPress={handleContactPress}>
        <Icon name="comments" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 28,
  },
  icon: {
    padding: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default TopBar;
