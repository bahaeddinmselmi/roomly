import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, I18nManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, LogOut, Trophy, MessageCircle, Users, Star } from 'lucide-react-native';
import { useTokens } from '@/contexts/TokenContext';
import { useUser } from '@/contexts/UserContext';
import { TokenIcon } from '@/components/TokenIcon';
import { useTranslation } from 'react-i18next';

const stats = [
  { label: 'Rooms Joined', value: '47', icon: MessageCircle },
  { label: 'Messages Sent', value: '1,234', icon: MessageCircle },
  { label: 'Friends Made', value: '23', icon: Users },
  { label: 'Achievements', value: '8', icon: Trophy },
];

export default function ProfileScreen() {
  const { tokens } = useTokens();
  const { user, logout } = useUser();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    router.replace('/onboarding');
  };

  const handleLanguageSwitch = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    I18nManager.forceRTL(newLang === 'ar');
    // Optionally reload app for RTL changes
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('profile', 'Profile')}</Text>
        <TouchableOpacity onPress={handleLanguageSwitch}>
          <Text style={{ color: '#4C6EF5', fontFamily: 'Inter-SemiBold' }}>{i18n.language === 'en' ? 'العربية' : 'English'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }}
              style={styles.avatar}
            />
            <View style={styles.levelBadge}>
              <Star size={12} color="#FFD700" />
              <Text style={styles.levelText}>Pro</Text>
            </View>
          </View>
          
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          
          <View style={styles.tokenBalance}>
            <TokenIcon size={24} />
            <Text style={styles.tokenText}>{tokens} Tokens</Text>
          </View>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <stat.icon size={20} color="#4C6EF5" />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Trophy size={20} color="#4C6EF5" />
            <Text style={styles.actionText}>Achievements</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Users size={20} color="#4C6EF5" />
            <Text style={styles.actionText}>Friends</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Settings size={20} color="#4C6EF5" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#4C6EF5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  levelText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  tokenBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  tokenText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#4C6EF5',
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9ff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  actionsSection: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  actionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
  },
});