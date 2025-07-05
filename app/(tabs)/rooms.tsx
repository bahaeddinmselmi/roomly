import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MessageCircle, Users, Clock, Plus } from 'lucide-react-native';
import { useTokens } from '@/contexts/TokenContext';
import { TokenIcon } from '@/components/TokenIcon';

const activeRooms = [
  { id: '1', name: 'Tech Talk', topic: 'Technology', users: 142, lastMessage: 'Anyone using React Native?', time: '2m ago' },
  { id: '2', name: 'Music Lovers', topic: 'Music', users: 89, lastMessage: 'New Taylor Swift album is amazing!', time: '5m ago' },
  { id: '3', name: 'Gaming Hub', topic: 'Gaming', users: 234, lastMessage: 'Who wants to play some games?', time: '1m ago' },
];

export default function RoomsScreen() {
  const { tokens } = useTokens();
  const router = useRouter();

  const handleJoinRoom = (roomId: string) => {
    router.push(`/chat/${roomId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat Rooms</Text>
        <View style={styles.tokenBalance}>
          <TokenIcon size={20} />
          <Text style={styles.tokenText}>{tokens}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MessageCircle size={20} color="#4C6EF5" />
            <Text style={styles.sectionTitle}>Active Rooms</Text>
          </View>
          
          <View style={styles.roomList}>
            {activeRooms.map(room => (
              <TouchableOpacity
                key={room.id}
                style={styles.roomCard}
                onPress={() => handleJoinRoom(room.id)}
              >
                <View style={styles.roomHeader}>
                  <Text style={styles.roomName}>{room.name}</Text>
                  <Text style={styles.roomTime}>{room.time}</Text>
                </View>
                <Text style={styles.roomTopic}>{room.topic}</Text>
                <Text style={styles.lastMessage}>{room.lastMessage}</Text>
                <View style={styles.roomFooter}>
                  <View style={styles.roomUsers}>
                    <Users size={14} color="#666" />
                    <Text style={styles.roomUsersText}>{room.users} users</Text>
                  </View>
                  <View style={styles.joinCost}>
                    <TokenIcon size={12} />
                    <Text style={styles.joinCostText}>1</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.createRoomButton}>
          <Plus size={20} color="white" />
          <Text style={styles.createRoomText}>Create New Room</Text>
        </TouchableOpacity>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  tokenBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  tokenText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#4C6EF5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  roomList: {
    gap: 12,
  },
  roomCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  roomName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  roomTime: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  roomTopic: {
    fontSize: 14,
    color: '#4C6EF5',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
    marginBottom: 12,
  },
  roomFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomUsers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  roomUsersText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  joinCost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f8f9ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  joinCostText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#4C6EF5',
  },
  createRoomButton: {
    backgroundColor: '#4C6EF5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 20,
  },
  createRoomText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});