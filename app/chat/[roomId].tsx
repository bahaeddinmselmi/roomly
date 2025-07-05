import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send, Mic, Image, Clock, Users } from 'lucide-react-native';
import { useTokens } from '@/contexts/TokenContext';
import { useUser } from '@/contexts/UserContext';
import { TokenIcon } from '@/components/TokenIcon';

const messages = [
  { id: '1', user: 'Alice', message: 'Hey everyone! 👋', time: '10:30 AM', isOwn: false },
  { id: '2', user: 'Bob', message: 'What\'s up?', time: '10:32 AM', isOwn: false },
  { id: '3', user: 'You', message: 'Just joined, how is everyone doing?', time: '10:33 AM', isOwn: true },
  { id: '4', user: 'Charlie', message: 'Welcome to the room!', time: '10:34 AM', isOwn: false },
];

export default function ChatRoomScreen() {
  const router = useRouter();
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { tokens, spendTokens } = useTokens();
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const scrollViewRef = useRef<ScrollView>(null);

  const roomName = roomId === 'random' ? 'Random Room' : `Room ${roomId}`;
  const activeUsers = 42;

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the server
      setMessage('');
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const handleBack = () => {
    router.back();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    // Spend token when entering room
    spendTokens(1);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#4C6EF5" />
        </TouchableOpacity>
        
        <View style={styles.roomInfo}>
          <Text style={styles.roomName}>{roomName}</Text>
          <View style={styles.roomMeta}>
            <Users size={12} color="#666" />
            <Text style={styles.userCount}>{activeUsers} users</Text>
          </View>
        </View>
        
        <View style={styles.headerRight}>
          <View style={styles.timer}>
            <Clock size={12} color="#666" />
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
          <View style={styles.tokenBalance}>
            <TokenIcon size={16} />
            <Text style={styles.tokenText}>{tokens}</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map(msg => (
            <View
              key={msg.id}
              style={[
                styles.messageContainer,
                msg.isOwn ? styles.ownMessage : styles.otherMessage
              ]}
            >
              {!msg.isOwn && (
                <Text style={styles.messageUser}>{msg.user}</Text>
              )}
              <Text style={styles.messageText}>{msg.message}</Text>
              <Text style={styles.messageTime}>{msg.time}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity style={styles.imageButton}>
            <Image size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.micButton}>
            <Mic size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendButton, message.trim() && styles.sendButtonActive]}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send size={20} color={message.trim() ? 'white' : '#999'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  roomInfo: {
    flex: 1,
  },
  roomName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 2,
  },
  roomMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  userCount: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  headerRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timerText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  tokenBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  tokenText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#4C6EF5',
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4C6EF5',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f5f5f5',
  },
  messageUser: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#666',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#333',
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 10,
    color: '#999',
    fontFamily: 'Inter-Regular',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    maxHeight: 100,
  },
  imageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#4C6EF5',
  },
});