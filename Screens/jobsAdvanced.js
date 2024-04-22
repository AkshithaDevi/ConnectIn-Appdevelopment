import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const JobListScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCriteria, setSelectedCriteria] = useState({
    query: 'Software Developer',
    location: 'United States',
    employmentType: 'fulltime'
  });

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://jobs-api14.p.rapidapi.com/list';
      const queryParams = {
        query: selectedCriteria.query,
        location: selectedCriteria.location,
        distance: '1.0',
        language: 'en_GB',
        remoteOnly: 'false',
        datePosted: 'month', // Default value set to 'month'
        employmentTypes: selectedCriteria.employmentType,
        index: '0'
      };

      const queryString = Object.keys(queryParams)
        .map(key => key + '=' + encodeURIComponent(queryParams[key]))
        .join('&');

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '8bc473e532msh04b31b4bb4a8af1p1190dejsnf82d7419b754',
          'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(`${url}?${queryString}`, options);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setJobs(data.jobs);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCriteria]);

  const handleJobPress = (url) => {
    Linking.openURL(url);
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCriteria.query}
          onValueChange={(itemValue) => setSelectedCriteria({ ...selectedCriteria, query: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="Software Developer" value="Software Developer" />
          <Picker.Item label="Web Developer" value="Web Developer" />
          <Picker.Item label="Mobile App Developer" value="Mobile App Developer" />
          <Picker.Item label="Game Developer" value="Game Developer" />
          <Picker.Item label="Frontend Developer" value="Frontend Developer" />
          <Picker.Item label="Backend Developer" value="Backend Developer" />
          <Picker.Item label="Full Stack Developer" value="Full Stack Developer" />
          <Picker.Item label="UI/UX Developer" value="UI/UX Developer" />
          <Picker.Item label="DevOps Engineer" value="DevOps Engineer" />
        </Picker>
        <Picker
          selectedValue={selectedCriteria.location}
          onValueChange={(itemValue) => setSelectedCriteria({ ...selectedCriteria, location: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="United States" value="United States" />
          <Picker.Item label="India" value="India" />
          <Picker.Item label="United Kingdom" value="United Kingdom" />
          <Picker.Item label="Canada" value="Canada" />
          <Picker.Item label="Australia" value="Australia" />
        </Picker>
        <Picker
          selectedValue={selectedCriteria.employmentType}
          onValueChange={(itemValue) => setSelectedCriteria({ ...selectedCriteria, employmentType: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="Full Time" value="fulltime" />
          <Picker.Item label="Part Time" value="parttime" />
          <Picker.Item label="Internship" value="intern" />
          <Picker.Item label="Contractor" value="contractor" />
        </Picker>
      </View>
      <Text style={styles.heading}>Job Listings Available</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleJobPress(item.jobProviders[0].url)} style={styles.jobContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.company}>{item.company}</Text>
              <Text style={styles.location}>{item.location}</Text>
              <Text style={styles.employmentType}>Employment Type: {item.employmentType}</Text>
              <Text style={styles.datePosted}>Posted: <Text style={styles.dateValue}>{item.timeAgoPosted}</Text></Text>
              <Text style={styles.link}>Job Link</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  pickerContainer: {
    alignItems: 'stretch',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  company: {
    fontSize: 16,
    marginBottom: 3,
    color: '#666',
  },
  location: {
    marginBottom: 10,
    color: '#666',
  },
  employmentType: {
    marginBottom: 3,
    color: '#666',
  },
  datePosted: {
    marginBottom: 10,
    color: '#666',
  },
  dateValue: {
    fontWeight: 'bold',
    color: '#333',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
});

export default JobListScreen;
