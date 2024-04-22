import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Animated, TouchableOpacity, TouchableNativeFeedback, Platform, TextInput, Button, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Skills from './SearchSkills'; // Import the Skills component
import ViewEducation from './SearchviewEducation'; // Import the ViewEducation component
import MyPost from './SearchPost'; // Import the MyPost component

const FeeListPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [search_user, setSearchUser] = useState("");
  const [accountDetails, setAccountDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('Skills'); // Default active tab is Skills
  const [followingStatus, setFollowingStatus] = useState('Follow'); // Default button text is 'Follow'
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getUsernameFromStorage = async () => {
      try {
        const storedSearchUser = await AsyncStorage.getItem('search_user'); // Get search_user from AsyncStorage
        if (storedSearchUser) {
          setSearchUser(storedSearchUser);
          setSubmitted(true); // Automatically trigger fetching account details
        }
      } catch (error) {
        console.error('Error retrieving search_user from AsyncStorage:', error);
      }
    };

    getUsernameFromStorage(); // Call the function to retrieve search_user from AsyncStorage
  }, []);

  useEffect(() => {
    if (submitted) {
      fetchAccountDetails();
      checkFollowingStatus(); // Check following status when component mounts
    }
  }, [submitted]);

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim]);

  const fetchAccountDetails = async () => {
    try {
      const response = await fetch(`https://mevn.in/apps/indeed/connectin/fetchProfile.php?username=${search_user}`);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const accountDetail = data[0]; // Extract the first item from the array
        setAccountDetails({
          name: accountDetail.name,
          phone_number: accountDetail.phone_number,
          email: accountDetail.email,
          created_at: accountDetail.created_at,
          imageUrl: `https://mevn.in/apps/indeed/connectin/uploads/${accountDetail.username}.jpg` // Add imageUrl field
        });
      } else {
        console.error('No account details found for the search_user:', search_user);
      }
    } catch (error) {
      console.error('Error fetching account details:', error);
    }
  };

  const checkFollowingStatus = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const url = `https://mevn.in/apps/indeed/connectin/checkFollowing.php?username=${username}&other_username=${search_user}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'success') {
        // If the relation already exists, set button text to 'following'
        if (data.message === 'following') {
          setFollowingStatus('Following');
        }
      } else {
        console.error('Error checking following status:', data.message);
      }
    } catch (error) {
      console.error('Error checking following status:', error);
    }
  };

  const handlePress = () => {
    console.log('Item pressed');
  };

  const handleEditProfile = () => {
    // Logic for handling edit profile button press
  };

  const handleResume = () => {
    // Logic for handling resume button press
  };

  const handleFollow = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const url = `https://mevn.in/apps/indeed/connectin/follow.php?username=${username}&other_username=${search_user}`;
      const response = await fetch(url);
      // Handle the response as needed
      setFollowingStatus('Following'); // Update button text to 'Following' after follow action
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#87CEEB', '#00BFFF']}
      style={styles.container}
    >
      <Text style={styles.heading}>Profile</Text>
      {submitted && accountDetails && (
        <View style={styles.accountDetailsContainer}>
          <Image
            source={{ uri: accountDetails.imageUrl }}
            style={styles.image}
          />
          
          <View style={styles.accountDetails}>
            <Text style={styles.accountDetailText}>Name: {accountDetails.name}</Text>
            <Text style={styles.accountDetailText}>Phone Number: {accountDetails.phone_number}</Text>
            <Text style={styles.accountDetailText}>Email: {accountDetails.email}</Text>
            <Text style={styles.accountDetailText}>Created At: {accountDetails.created_at}</Text>
            <TouchableOpacity onPress={handleFollow} style={styles.followButton}>
              <Text style={styles.followButtonText}>{followingStatus}</Text>
              {followingStatus === 'Following' && (
                <FontAwesome5 name="check" size={16} color="#fff" style={styles.icon} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
  
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Skills')} style={[styles.tab, activeTab === 'Skills' && styles.activeTab]}>
          <Text style={styles.tabText}>Skills</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Education')} style={[styles.tab, activeTab === 'Education' && styles.activeTab]}>
          <Text style={styles.tabText}>Education</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Posts')} style={[styles.tab, activeTab === 'Posts' && styles.activeTab]}>
          <Text style={styles.tabText}>Posts</Text>
        </TouchableOpacity>
      </View>
      {/* Render content based on active tab */}
      {activeTab === 'Skills' && (
        <Skills /> // Render the Skills component
      )}
      {activeTab === 'Education' && (
        <ViewEducation /> // Render the ViewEducation component
      )}
      {activeTab === 'Posts' && (
        <MyPost /> // Render the MyPost component
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  accountDetailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountDetails: {
    marginLeft: 20,
    flex: 1,
  },
  accountDetailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#87CEEB',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  followButton: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    marginLeft: 5,
  },
});

export default FeeListPage;
