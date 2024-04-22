import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from '@react-navigation/native';

export default function App() {
  const route = useRoute();
  const { username } = route.params;

  console.log('Username:', username);

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [content, setContent] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permission to upload images."
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();

      console.log("Image Picker Result:", result);

      if (!result.cancelled) {
        setFile(result.assets[0].uri);
        setError(null);
      }

      if (result.error) {
        console.error("Image Picker Error:", result.error);
        setError(result.error);
      }
    }
  };

  const generateNumericUUID = () => {
    const chars = '0123456789';
    let uuid = '';
    for (let i = 0; i < 32; i++) {
        uuid += chars[Math.floor(Math.random() * chars.length)];
    }
    return uuid;
};


  const uploadImage = async (uri) => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', { uri, name: 'image.jpg', type: 'image/jpeg' });
    const post_id = generateNumericUUID(); // Generate unique post_id
    formData.append('post_id', post_id);


    try {


        const url = `https://mevn.in/apps/indeed/connectin/CAddPost.php?post_id=${encodeURIComponent(post_id)}&username=${encodeURIComponent(username)}&caption=${encodeURIComponent(caption)}&content=${encodeURIComponent(content)}`;

        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Handle successful response
            // You might want to navigate to another screen or show a success message
            console.log('Post added successfully');
            // Example: Navigate to another screen
            // navigation.navigate('SuccessScreen');
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error, you might want to show an error message to the user
            Alert.alert('Post failed', 'Failed to add post. Please try again.');
          });
      const response = await fetch('https://mevn.in/apps/indeed/connectin/cpost.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      console.log("Upload Response:", data);
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Upload Error", "Failed to upload image. Please try again later.");
    }

    setUploading(false);
  };

  const handleSubmit = async () => {
    if (!file) {
      Alert.alert("No Image Selected", "Please select an image before submitting.");
      return;
    }

    try {
      await uploadImage(file);
      setFile(null);
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Upload Error", "Failed to upload image. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Caption"
        onChangeText={text => setCaption(text)}
        value={caption}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Enter Content"
        onChangeText={text => setContent(text)}
        value={content}
        multiline={true}
        numberOfLines={4}
      />

      <Text style={styles.header}>Add Image:</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>

      {file ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: file }} style={styles.image} />
        </View>
      ) : (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={uploading}>
        <Text style={styles.buttonText}>{uploading ? 'Uploading...' : 'Submit'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#EDF6F9", // Light blue background
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#0C7A86", // Dark blue text color
  },
  header: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
    color: "#0C7A86", // Dark blue text color
  },
  input: {
    width: "100%",
    borderColor: '#4D7EA8', // Lighter blue border color
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    backgroundColor: "#FFFFFF", // White background for input
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: "#0C7A86", // Dark blue button color
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#4D7EA8', // Lighter blue border color
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    marginTop: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#0C7A86", // Dark blue button color
    padding: 12,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
