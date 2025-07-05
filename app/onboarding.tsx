import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';

export default function OnboardingScreen() {
  const router = useRouter();
  const { login } = useUser();

  const handleGoogleLogin = () => {
    // Simulate Google login
    login({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    });
    router.replace('/(tabs)');
  };

  return (
    <LinearGradient
      colors={['#4C6EF5', '#7C3AED']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>RR</Text>
          </View>
          <Text style={styles.appName}>RoomRealm</Text>
          <Text style={styles.tagline}>Connect. Chat. Earn.</Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureText}>💬 Join exciting chat rooms</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>🪙 Earn tokens by watching ads</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>👥 Meet new people worldwide</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleGoogleLogin}>
          <Text style={styles.loginText}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  appName: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Inter-Regular',
  },
  features: {
    marginBottom: 40,
    gap: 16,
  },
  feature: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    width: 280,
  },
  featureText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4C6EF5',
  },
  terms: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});