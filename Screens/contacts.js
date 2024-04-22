import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const UserList = ({ navigation }) => {
  // State to hold user data
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the remote server
    fetch('https://mevn.in/apps/indeed/contacts.php?followerName=1')
      .then(response => response.json()) // Parse the JSON response
      .then(data => {
        // Assuming the data is an array of objects with user_id and following_name properties
        setUsers(data); // Update the state with the fetched user data
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ConnectIn</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={item => item.user_id} // Assuming user_id is unique
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('chat', { sender: '1', receiver: item.user_id , receivername:item.following_name })}
          >
            <Text style={styles.title}>{item.following_name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingTop: 10
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  title: {
    fontSize: 18
  }
});

export default UserList;