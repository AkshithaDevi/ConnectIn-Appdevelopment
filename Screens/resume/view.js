import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResumePage = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve user_id from AsyncStorage
    const retrieveUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id');
        if (storedUserId !== null) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Error retrieving user_id:', error);
      }
    };

    retrieveUserId();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {userId && (
        <WebView
          source={{ uri: `https://mevn.in/apps/resume/resume.php?user_id=${userId}` }}
          style={styles.webview}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});

export default ResumePage;
