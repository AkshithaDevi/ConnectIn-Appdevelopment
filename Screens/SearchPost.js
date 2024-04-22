import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyComponent = () => {
  const [posts, setPosts] = useState([]);
  const [searchUser, setSearchUser] = useState('');

  useEffect(() => {
    getUsernameFromStorage();
  }, []);

  const getUsernameFromStorage = async () => {
    try {
      const storedSearchUser = await AsyncStorage.getItem('search_user');
      if (storedSearchUser) {
        setSearchUser(storedSearchUser);
        fetchData(storedSearchUser);
      }
    } catch (error) {
      console.error('Error retrieving search user from AsyncStorage:', error);
    }
  };

  const fetchData = async (searchUser) => {
    try {
      const response = await fetch(`https://mevn.in/apps/indeed/connectin/myPost.php?username=${searchUser}`);
      const json = await response.json();
      setPosts(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.userInfo}>
        <Image source={{ uri: `https://mevn.in/apps/indeed/connectin/uploads/${searchUser}.jpg` }} style={styles.profilePic} />
        <View style={styles.userInfoText}>
          <Text style={styles.username}>@{item.username}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
          <Text style={styles.content}>{item.content}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
      <Image source={{ uri: `https://mevn.in/apps/indeed/connectin/posts/${item.post_id}.jpg` }} style={styles.postImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.post_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfoText: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    marginBottom: 5,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
  },
  content: {
    fontSize: 14,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-start',
  },
  postImage: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
});

export default MyComponent;
