import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const URLList = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredUrls, setFilteredUrls] = useState([]);

  const allUrls = [
    { category: 'Practice', urls: ['https://neetcode.io/practice', 'https://cp-algorithms.com/','https://cses.fi/problemset/', 'https://seanprashad.com/leetcode-patterns/',] },
    { category: 'Tutorials', urls: ['https://www.youtube.com/c/takeUforward/playlists',
    'https://www.youtube.com/channel/UCD8yeTczadqdARzQUp29PJw'] },
    { category: 'Documents', urls: ['https://drive.google.com/drive/folders/14pzMRhpQCBbcGREmVz4cpT1eBBkddlKB', 'https://drive.google.com/drive/folders/11oDlkh3v7SKhE-GueVriPHivPOZFMw4G'] },
    { category: 'Road maps', urls: ['https://whimsical.com/100-days-of-dsa-JjsnhMcKViecPVFfFAZx3g',
  'https://whimsical.com/codeforces-candidate-master-roadmap-by-love-babbar-CiXPPD3CnwoXPr2d8Ajx1h',] },
  ];

  const handleLinkPress = (url) => {
    navigation.navigate('displayLink', { url });
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = allUrls.reduce((acc, category) => {
      const filteredCategory = category.urls.filter(url => url.includes(text.toLowerCase()));
      if (filteredCategory.length > 0) {
        acc.push({ category: category.category, urls: filteredCategory });
      }
      return acc;
    }, []);
    setFilteredUrls(filtered);
  };

  const renderUrls = (urls) => (
    urls.map((url, index) => (
      <TouchableOpacity key={index} onPress={() => handleLinkPress(url)}>
        <Text style={styles.url}>{url}</Text>
      </TouchableOpacity>
    ))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Resources</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search URLs"
        value={searchText}
        onChangeText={handleSearch}
      />
      {searchText.length === 0 ?
        allUrls.map((category, index) => (
          <View key={index}>
            <Text style={styles.categoryHeading}>{category.category}</Text>
            {renderUrls(category.urls)}
          </View>
        )) :
        filteredUrls.map((category, index) => (
          <View key={index}>
            <Text style={styles.categoryHeading}>{category.category}</Text>
            {renderUrls(category.urls)}
          </View>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Change background color to white
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  categoryHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
    textDecorationLine: 'underline', // Add underline to category headings
  },
  url: {
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
    marginBottom: 5, // Add some bottom margin to URLs
  },
});

export default URLList;
