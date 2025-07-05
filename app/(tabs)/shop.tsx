import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, UserPlus, CreditCard, Share } from 'lucide-react-native';
import { useTokens } from '@/contexts/TokenContext';
import { TokenIcon } from '@/components/TokenIcon';

const tokenPacks = [
  { id: '1', tokens: 10, price: '$0.99', popular: false },
  { id: '2', tokens: 50, price: '$3.99', popular: true },
  { id: '3', tokens: 100, price: '$6.99', popular: false },
];

export default function ShopScreen() {
  const { tokens, addTokens } = useTokens();

  const handleWatchAd = () => {
    // Simulate watching ad
    addTokens(1);
  };

  const handleInviteFriend = () => {
    // Simulate inviting friend
    // In real app, this would open share sheet
    console.log('Invite friend');
  };

  const handlePurchaseTokens = (packTokens: number) => {
    // Simulate purchase
    addTokens(packTokens);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Token Shop</Text>
        <View style={styles.tokenBalance}>
          <TokenIcon size={20} />
          <Text style={styles.tokenText}>{tokens}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.freeSection}>
          <Text style={styles.sectionTitle}>Earn Free Tokens</Text>
          
          <TouchableOpacity style={styles.freeOption} onPress={handleWatchAd}>
            <View style={styles.optionIcon}>
              <Play size={20} color="#4C6EF5" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Watch Ad</Text>
              <Text style={styles.optionDescription}>Get 1 token for watching a short ad</Text>
            </View>
            <View style={styles.optionReward}>
              <TokenIcon size={16} />
              <Text style={styles.rewardText}>+1</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.freeOption} onPress={handleInviteFriend}>
            <View style={styles.optionIcon}>
              <UserPlus size={20} color="#4C6EF5" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Invite Friend</Text>
              <Text style={styles.optionDescription}>Get 5 tokens when a friend joins</Text>
            </View>
            <View style={styles.optionReward}>
              <TokenIcon size={16} />
              <Text style={styles.rewardText}>+5</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton}>
            <Share size={16} color="#4C6EF5" />
            <Text style={styles.shareText}>Copy Invite Link</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.purchaseSection}>
          <Text style={styles.sectionTitle}>Buy Token Packs</Text>
          
          <View style={styles.tokenPacks}>
            {tokenPacks.map(pack => (
              <TouchableOpacity
                key={pack.id}
                style={[styles.tokenPack, pack.popular && styles.popularPack]}
                onPress={() => handlePurchaseTokens(pack.tokens)}
              >
                {pack.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Most Popular</Text>
                  </View>
                )}
                <View style={styles.packHeader}>
                  <TokenIcon size={32} />
                  <Text style={styles.packTokens}>{pack.tokens} Tokens</Text>
                </View>
                <Text style={styles.packPrice}>{pack.price}</Text>
                <View style={styles.packButton}>
                  <CreditCard size={16} color="white" />
                  <Text style={styles.packButtonText}>Purchase</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How to Use Tokens</Text>
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>• Join chat rooms (1 token)</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>• Create rooms (2 tokens)</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>• Private matches (3 tokens)</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoText}>• Voice chat (extra 2 tokens)</Text>
            </View>
          </View>
        </View>
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
  freeSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 16,
  },
  freeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e6e8ff',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  optionReward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rewardText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#22c55e',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4C6EF5',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  shareText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4C6EF5',
  },
  purchaseSection: {
    marginBottom: 32,
  },
  tokenPacks: {
    gap: 12,
  },
  tokenPack: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    alignItems: 'center',
    position: 'relative',
  },
  popularPack: {
    borderColor: '#4C6EF5',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    backgroundColor: '#4C6EF5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  packHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  packTokens: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginTop: 8,
  },
  packPrice: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#4C6EF5',
    marginBottom: 16,
  },
  packButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4C6EF5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  packButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  infoSection: {
    backgroundColor: '#f8f9ff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  infoList: {
    gap: 8,
  },
  infoItem: {},
  infoText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
});