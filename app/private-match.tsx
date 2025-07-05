import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Users, Mic, MessageCircle } from 'lucide-react-native';
import { useTokens } from '@/contexts/TokenContext';
import { TokenIcon } from '@/components/TokenIcon';
import { NotEnoughTokensModal } from '@/components/NotEnoughTokensModal';

export default function PrivateMatchScreen() {
  const router = useRouter();
  const { tokens, hasEnoughTokens, spendTokens } = useTokens();
  const [selectedGender, setSelectedGender] = useState<'any' | 'male' | 'female'>('any');
  const [includeVoice, setIncludeVoice] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);

  const baseCost = 3;
  const voiceCost = 2;
  const totalCost = baseCost + (includeVoice ? voiceCost : 0);

  const handleStartMatch = () => {
    if (hasEnoughTokens(totalCost)) {
      spendTokens(totalCost);
      // Navigate to a private chat room
      router.push('/chat/private-123');
    } else {
      setShowTokenModal(true);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#4C6EF5" />
        </TouchableOpacity>
        <Text style={styles.title}>Private Match</Text>
        <View style={styles.tokenBalance}>
          <TokenIcon size={16} />
          <Text style={styles.tokenText}>{tokens}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Users size={40} color="#4C6EF5" />
          </View>
          <Text style={styles.heroTitle}>Get Matched Instantly</Text>
          <Text style={styles.heroDescription}>
            Connect with a random person for a private chat. Perfect for making new friends!
          </Text>
        </View>

        <View style={styles.options}>
          <View style={styles.optionSection}>
            <Text style={styles.optionTitle}>Gender Preference</Text>
            <View style={styles.genderOptions}>
              {[
                { value: 'any', label: 'Anyone' },
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ].map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.genderOption,
                    selectedGender === option.value && styles.selectedGenderOption
                  ]}
                  onPress={() => setSelectedGender(option.value as any)}
                >
                  <Text style={[
                    styles.genderOptionText,
                    selectedGender === option.value && styles.selectedGenderOptionText
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.optionSection}>
            <Text style={styles.optionTitle}>Chat Features</Text>
            <TouchableOpacity
              style={styles.featureOption}
              onPress={() => setIncludeVoice(!includeVoice)}
            >
              <View style={styles.featureInfo}>
                <Mic size={20} color="#4C6EF5" />
                <View style={styles.featureText}>
                  <Text style={styles.featureName}>Voice Chat</Text>
                  <Text style={styles.featureDescription}>Enable voice messages</Text>
                </View>
              </View>
              <View style={styles.featureCost}>
                <Text style={styles.featureCostText}>+2</Text>
                <TokenIcon size={14} />
              </View>
              <View style={[styles.checkbox, includeVoice && styles.checkedBox]}>
                {includeVoice && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.costBreakdown}>
          <Text style={styles.costTitle}>Cost Breakdown</Text>
          <View style={styles.costItem}>
            <Text style={styles.costLabel}>Private Match</Text>
            <View style={styles.costValue}>
              <Text style={styles.costAmount}>3</Text>
              <TokenIcon size={14} />
            </View>
          </View>
          {includeVoice && (
            <View style={styles.costItem}>
              <Text style={styles.costLabel}>Voice Chat</Text>
              <View style={styles.costValue}>
                <Text style={styles.costAmount}>2</Text>
                <TokenIcon size={14} />
              </View>
            </View>
          )}
          <View style={styles.costDivider} />
          <View style={styles.costItem}>
            <Text style={styles.totalLabel}>Total Cost</Text>
            <View style={styles.costValue}>
              <Text style={styles.totalAmount}>{totalCost}</Text>
              <TokenIcon size={16} />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.startButton, !hasEnoughTokens(totalCost) && styles.disabledButton]}
          onPress={handleStartMatch}
        >
          <MessageCircle size={20} color="white" />
          <Text style={styles.startButtonText}>Start Match</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Matches are completely random and anonymous. Be respectful and follow community guidelines.
        </Text>
      </ScrollView>

      <NotEnoughTokensModal
        visible={showTokenModal}
        onClose={() => setShowTokenModal(false)}
        onWatchAd={() => setShowTokenModal(false)}
        onBuyTokens={() => {
          setShowTokenModal(false);
          router.push('/(tabs)/shop');
        }}
        onInviteFriend={() => setShowTokenModal(false)}
        requiredTokens={totalCost}
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
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
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
  content: {
    flex: 1,
    padding: 20,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f8f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
  options: {
    marginBottom: 32,
  },
  optionSection: {
    marginBottom: 24,
  },
  optionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  genderOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  genderOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  selectedGenderOption: {
    backgroundColor: '#4C6EF5',
  },
  genderOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666',
  },
  selectedGenderOptionText: {
    color: 'white',
  },
  featureOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e6e8ff',
  },
  featureInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  featureText: {
    flex: 1,
  },
  featureName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  featureCost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 12,
  },
  featureCostText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4C6EF5',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#4C6EF5',
    borderColor: '#4C6EF5',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  costBreakdown: {
    backgroundColor: '#f8f9ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  costTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  costLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  costValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  costAmount: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4C6EF5',
  },
  costDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#4C6EF5',
  },
  startButton: {
    backgroundColor: '#4C6EF5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 16,
  },
});