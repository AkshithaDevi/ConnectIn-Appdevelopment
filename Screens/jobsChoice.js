import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Job Portal</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Job Board"
          onPress={() => navigation.navigate('jobs')}
          color="#2196F3"
          buttonStyle={styles.button}
        />
        <View style={styles.space} />
        <Button
          title="Advanced Jobs"
          onPress={() => navigation.navigate('jobsAdvanced')}
          color="#2196F3"
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    paddingBottom:20,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    height: 80,
    marginBottom: 20,
  },
  space: {
    height: 20,
  },
});

export default HomeScreen;
