import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Shuffle, Plus, TrendingUp, Clock, Users } from 'lucide-react-native';
import { useTokens } from '@/contexts/TokenContext';
import { useUser } from '@/contexts/UserContext';
import { TokenIcon } from '@/components/TokenIcon';
import { NotEnoughTokensModal } from '@/components/NotEnoughTokensModal';

const trendingRooms = [
  { id: '1', name: 'Tech Talk', topic: 'Technology', users: 142, isActive: true },
  { id: '2', name: 'Music Lovers', topic: 'Music', users: 89, isActive: true },
  { id: '3', name: 'Gaming Hub', topic: 'Gaming', users: 234, isActive: true },
  { id: '4', name: 'Art Studio', topic: 'Art & Design', users: 56, isActive: false },
  { id: '5', name: 'Book Club', topic: 'Literature', users: 78, isActive: true },
];

export default function HomeScreen() {
  const { tokens, hasEnoughTokens } = useTokens();
  const { user } = useUser();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [requiredTokens, setRequiredTokens] = useState(1);

  const handleJoinRoom = (roomId: string, tokensRequired: number = 1) => {
    if (hasEnoughTokens(tokensRequired)) {
      router.push(`/chat/${roomId}`);
    } else {
      setRequiredTokens(tokensRequired);
      setShowTokenModal(true);
    }
  };

  const handleCreateRoom = () => {
    if (hasEnoughTokens(2)) {
      // Navigate to create room screen
      console.log('Create room');
    } else {
      setRequiredTokens(2);
      setShowTokenModal(true);
    }
  };

  const handleRandomRoom = () => {
    handleJoinRoom('random', 1);
  };

  const filteredRooms = trendingRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.username}>{user?.name || 'User'}</Text>
        </View>
        <View style={styles.tokenBalance}>
          <TokenIcon size={20} />
          <Text style={styles.tokenText}>{tokens}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.primaryAction} onPress={handleRandomRoom}>
            <Shuffle size={20} color="white" />
            <Text style={styles.primaryActionText}>Join Random Room</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.secondaryAction, !hasEnoughTokens(2) && styles.disabledAction]} 
            onPress={handleCreateRoom}
          >
            <Plus size={20} color={hasEnoughTokens(2) ? '#4C6EF5' : '#999'} />
            <Text style={[styles.secondaryActionText, !hasEnoughTokens(2) && styles.disabledText]}>
              Create Room
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search rooms or topics..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#4C6EF5" />
            <Text style={styles.sectionTitle}>Trending Rooms</Text>
          </View>
          
          <View style={styles.roomList}>
            {filteredRooms.map(room => (
              <TouchableOpacity
                key={room.id}
                style={styles.roomCard}
                onPress={() => handleJoinRoom(room.id)}
              >
                <View style={styles.roomInfo}>
                  <Text style={styles.roomName}>{room.name}</Text>
                  <Text style={styles.roomTopic}>{room.topic}</Text>
                </View>
                <View style={styles.roomMeta}>
                  <View style={styles.roomUsers}>
                    <Users size={14} color="#666" />
                    <Text style={styles.roomUsersText}>{room.users}</Text>
                  </View>
                  <View style={[styles.roomStatus, room.isActive && styles.activeStatus]}>
                    <Text style={[styles.statusText, room.isActive && styles.activeStatusText]}>
                      {room.isActive ? 'Active' : 'Quiet'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.privateMatchCard}
          onPress={() => router.push('/private-match')}
        >
          <View style={styles.privateMatchContent}>
            <Text style={styles.privateMatchTitle}>Private Match</Text>
            <Text style={styles.privateMatchSubtitle}>Get matched with someone new</Text>
          </View>
          <View style={styles.privateMatchCost}>
            <TokenIcon size={16} />
            <Text style={styles.privateMatchCostText}>3</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <NotEnoughTokensModal
        visible={showTokenModal}
        onClose={() => setShowTokenModal(false)}
        onWatchAd={() => {
          setShowTokenModal(false);
          // Handle watch ad
        }}
        onBuyTokens={() => {
          setShowTokenModal(false);
          router.push('/(tabs)/shop');
        }}
        onInviteFriend={() => {
          setShowTokenModal(false);
          // Handle invite friend
        }}
        requiredTokens={requiredTokens}
      />
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
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  username: {
    fontSize: 18,
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
  quickActions: {
    gap: 12,
    marginBottom: 24,
  },
  primaryAction: {
    backgroundColor: '#4C6EF5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryActionText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  secondaryAction: {
    backgroundColor: '#f8f9ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e6e8ff',
  },
  disabledAction: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
  secondaryActionText: {
    color: '#4C6EF5',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  disabledText: {
    color: '#999',
  },
  searchSection: {
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
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
  roomInfo: {
    marginBottom: 8,
  },
  roomName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  roomTopic: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  roomMeta: {
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
  roomStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  activeStatus: {
    backgroundColor: '#e8f5e8',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#666',
  },
  activeStatusText: {
    color: '#22c55e',
  },
  privateMatchCard: {
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e6e8ff',
    marginBottom: 20,
  },
  privateMatchContent: {
    flex: 1,
  },
  privateMatchTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  privateMatchSubtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  privateMatchCost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  privateMatchCostText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4C6EF5',
  },
});