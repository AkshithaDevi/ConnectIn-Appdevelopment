import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const JobListScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const url = 'https://arbeitnow-free-job-board.p.rapidapi.com/api/job-board-api';
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': 'c5e755faa8msh0a5e6a0e19fd765p16a7b4jsnebb2c4e0a78a',
          'X-RapidAPI-Host': 'arbeitnow-free-job-board.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setJobs(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobPress = (url) => {
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Job Listings Available</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.slug.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleJobPress(item.url)} style={styles.jobContainer}>
            <View style={styles.jobHeader}>
              <Text style={styles.title}>{item.title}</Text>
              <Icon name="briefcase" size={20} color="#666" style={styles.icon} />
            </View>
            <Text style={styles.company}>{item.company_name}</Text>
            <View style={styles.locationContainer}>
              <Icon name="map-marker" size={16} color="#666" style={styles.icon} />
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  jobContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  company: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    color: '#666',
    marginBottom: 3,
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default JobListScreen;
