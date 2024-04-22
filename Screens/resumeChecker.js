import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [resultText, setResultText] = useState('');
  const [fileContent, setFileContent] = useState('');

  const pickDocument = async () => {
    try {cf
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', 
      });

      console.log('Document picked:', result);
      
      if (result.type === 'success') {
        setSelectedFile(result);
        const content = await getFileContent(result.uri);
        setFileContent(content); // Set the content of the file
        setResultText(JSON.stringify(result, null, 2)); // Update resultText state with the result
      } else {
        setSelectedFile(null);
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  const getFileContent = async (uri) => {
    try {
      console.log('File URI:', uri); // Log the URI to ensure it's correct
      const fileInfo = await FileSystem.getInfoAsync(uri);
      console.log('File Info:', fileInfo); // Log the file info
      if (!fileInfo.exists) {
        throw new Error('File does not exist');
      }
      const content = await FileSystem.readAsStringAsync(uri);
      console.log('File Content:', content); // Log the content
      return content;
    } catch (error) {
      console.log('Error reading file:', error);
      return '';
    }
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick Document" onPress={pickDocument} />
      {resultText !== '' && ( // Conditional rendering if resultText is not empty
        <View style={{ marginTop: 20 }}>
          <Text>Result:</Text>
          <Text>{resultText}</Text>
        </View>
      )}
      {fileContent !== '' && ( // Conditional rendering if fileContent is not empty
        <View style={{ marginTop: 20 }}>
          <Text>File Content:</Text>
          <Text>{fileContent}</Text>
        </View>
      )}
    </View>
  );
}
