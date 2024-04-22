import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon component

const ChatScreen = ({ route }) => {
  const { sender, receiver, receivername } = route.params; // Changed to include 'sender' and 'receiver'
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(fetchMessages, 200);
    return () => clearInterval(intervalId);
  }, []);

  const fetchMessages = () => {
    fetch(`https://mevn.in/apps/indeed/getmessages.php?sender=${sender}&receiver=${receiver}`) // Changed to use 'sender' and 'receiver'
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  };

  const sendMessage = () => {
    if (message.trim().length > 0) {
      const newMessage = { sender: sender, receiver: receiver, text: message, timestamp: new Date().toISOString() }; // Changed to use 'sender' and 'receiver'
      fetch('https://mevn.in/apps/indeed/sendmessage.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setMessage('');
          fetchMessages();
        } else {
          console.error('Failed to send message:', data.message);
        }
      })
      .catch(error => console.error('Error sending message:', error));
    }
  };

  const handleLongPress = (message) => {
    // Only select messages sent by the sender
    if (message.sender === sender) { // Changed to use 'sender'
      const messageId = message.id;
      if (selectedMessages.includes(messageId)) {
        setSelectedMessages(selectedMessages.filter(id => id !== messageId));
      } else {
        setSelectedMessages([...selectedMessages, messageId]);
      }
    }
  };

  const deleteSelectedMessages = () => {
    Alert.alert(
      "Delete Messages",
      "Are you sure you want to delete the selected messages?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => {
            fetch('https://mevn.in/apps/indeed/deletemessages.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ messageIds: selectedMessages })
            })
            .then(response => response.json())
            .then(data => {
              if (data.status === 'success') {
                setMessages(messages.filter(msg => !selectedMessages.includes(msg.id)));
                setSelectedMessages([]);
              } else {
                console.error('Failed to delete messages:', data.message);
              }
            })
            .catch(error => console.error('Error deleting messages:', error));
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.headerText}>Chatting with {receivername}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => handleLongPress(item)}
            style={[
              styles.messageContainer,
              item.sender === sender ? styles.sentMessage : styles.receivedMessage, // Changed to use 'sender'
              selectedMessages.includes(item.id) ? styles.selectedMessage : null
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
          <Icon name="send" size={30} color="blue" />
        </TouchableOpacity>
        {selectedMessages.length > 0 && (
          <TouchableOpacity onPress={deleteSelectedMessages} style={styles.iconButton}>
            <Icon name="delete" size={30} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white',
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#DCF8C6',
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
  },
  selectedMessage: {
    borderWidth: 2,
    borderColor: '#4a90e2',
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
  },
  iconButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
