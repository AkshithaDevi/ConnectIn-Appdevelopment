import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBar from './TopBar';
import AllPost from './AllPost'; // Import the AllPost component

const Choice = ({ navigation, route }) => {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.content}>
        <View style={styles.allPostContainer}>
          <AllPost style={styles.allPost} />
        </View>
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home', { username })} style={styles.tab}>
          <Icon name="home" size={25} color="black" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('resources', { username })} style={styles.tab}>
          <Icon name="folder" size={25} color="black" />
          <Text style={styles.tabText}>Resources</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('cpost', { username })} style={styles.tab}>
          <Icon name="plus-circle" size={25} color="black" />
          <Text style={styles.tabText}>Add Post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications', { username })} style={styles.tab}>
          <Icon name="bell" size={25} color="black" />
          <Text style={styles.tabText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('jobsChoice', { username })} style={styles.tab}>
          <Icon name="briefcase" size={25} color="black" />
          <Text style={styles.tabText}>Jobs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameText: {
    fontSize: 20,
    paddingTop:20,
  },
  allPostContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%', // Adjust the width as needed
  },
  allPost: {
    // Add any specific styles for the AllPost component here if needed
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
  },
});

export default Choice;
