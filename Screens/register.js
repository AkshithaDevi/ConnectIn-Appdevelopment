import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigation = useNavigation();

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

  const uploadImage = async (uri, username) => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', { uri, name: `${username}.jpg`, type: 'image/jpeg' });
    formData.append('username', username);

    try {
      const response = await fetch('https://mevn.in/apps/indeed/connectin/uploads.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseData = await response.text(); // Read response as text

      console.log('Server Response:', responseData); // Log the response

      // Parse JSON response if it's JSON
      let data;
      try {
        data = JSON.parse(responseData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        // Handle non-JSON response here
        return;
      }

      if (data.success) {
        console.log('Image uploaded successfully');
      } else {
        console.error('Image upload failed:', data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    setUploading(false);
  };

  const handleSubmit = async () => {
    if (!file) {
      Alert.alert("No Image Selected", "Please select an image before submitting.");
      return;
    }

    try {
      // Check if any field is empty
      if (
        !username ||
        !name ||
        !phoneNumber ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        Alert.alert('Please fill in all fields');
        return; // Exit the function if any field is empty
      }

// Example validation for name field
if (!/^[A-Za-z. ]+$/.test(name)) {
  alert('Name must contain only alphabetic characters, spaces, and periods');
  return;
}


  // Check if phone number is 10 digits
  if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
    alert('Phone number must be 10 digits');
    return; // Exit the function if phone number is not 10 digits
  }

  // Example validation for email field
if (!/^\S+@\S+\.\S+$/.test(email)) {
  alert('Please enter a valid email address');
  return;
}

 // Check password strength
const requirements = [];
if (password.length < 8) {
  requirements.push('at least 8 characters');
}
if (!/(?=.*\d)/.test(password)) {
  requirements.push('at least one digit');
}
if (!/(?=.*[a-z])/.test(password)) {
  requirements.push('at least one lowercase letter');
}
if (!/(?=.*[A-Z])/.test(password)) {
  requirements.push('at least one uppercase letter');
}
if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
  requirements.push('at least one special character');
}

if (requirements.length > 0) {
  alert(`Password must be very strong. Add: ${requirements.join(', ')}`);
  return; // Exit the function if password is not strong
}

      // Check if passwords match
      if (password !== confirmPassword) {
        Alert.alert('Passwords do not match');
        return; // Exit the function if passwords don't match
      }

      const url = `https://mevn.in/apps/indeed/connectin/register.php?username=${username}&name=${encodeURIComponent(name)}&phone_number=${phoneNumber}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&confirm_password=${encodeURIComponent(confirmPassword)}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Handle successful response
        // You might want to navigate to another screen or show a success message
        console.log('Registration successful');
        // Example: Navigate to another screen
        // navigation.navigate('SuccessScreen');
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle error, you might want to show an error message to the user
        setErrorMessage('Registration failed. Please try again.');
      });

      // Upload image with username
      await uploadImage(file, username);

      // Assuming you have some navigation stack set up
      navigation.navigate('login', {
        username,
        name,
        phoneNumber,
        email,
        password
      });

      setFile(null);
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Upload Error", "Failed to upload image. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>SignUp</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={text => setName(text)}
        />
      
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          keyboardType="numeric"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={true}
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
        
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.btnText}>{uploading ? 'Uploading...' : 'Submit'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 30,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#495057',
  },
  submitBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom:30,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#000000",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    marginTop: 16,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
  },
});

export default RegisterScreen;
