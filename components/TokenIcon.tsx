import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';

interface TokenIconProps {
  size?: number;
  color?: string;
}

export function TokenIcon({ size = 24, color = '#FFD700' }: TokenIconProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.coin, { backgroundColor: color }]} />
      <Flame 
        size={size * 0.6} 
        color="#FF6B35" 
        style={styles.flame}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coin: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    position: 'absolute',
  },
  flame: {
    position: 'absolute',
  },
});