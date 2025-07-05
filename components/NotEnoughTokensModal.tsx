import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { X, Play, CreditCard, UserPlus } from 'lucide-react-native';
import { TokenIcon } from './TokenIcon';
import { useTranslation } from 'react-i18next';

interface NotEnoughTokensModalProps {
  visible: boolean;
  onClose: () => void;
  onWatchAd: () => void;
  onBuyTokens: () => void;
  onInviteFriend: () => void;
  requiredTokens: number;
}

export function NotEnoughTokensModal({
  visible,
  onClose,
  onWatchAd,
  onBuyTokens,
  onInviteFriend,
  requiredTokens,
}: NotEnoughTokensModalProps) {
  const { t } = useTranslation();
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('notEnoughTokens')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#666" />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <View style={styles.tokenRequired}>
              <TokenIcon size={32} />
              <Text style={styles.requiredText}>
                {t('needTokens', { count: requiredTokens, plural: requiredTokens > 1 ? 's' : '' })}
              </Text>
            </View>
            <View style={styles.options}>
              <TouchableOpacity style={styles.option} onPress={onWatchAd}>
                <Play size={20} color="#4C6EF5" />
                <Text style={styles.optionText}>{t('watchAd')}</Text>
                <Text style={styles.optionSubtext}>{t('getToken')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={onBuyTokens}>
                <CreditCard size={20} color="#4C6EF5" />
                <Text style={styles.optionText}>{t('buyTokens')}</Text>
                <Text style={styles.optionSubtext}>{t('tokenShop')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={onInviteFriend}>
                <UserPlus size={20} color="#4C6EF5" />
                <Text style={styles.optionText}>{t('inviteFriend')}</Text>
                <Text style={styles.optionSubtext}>{t('get5Tokens')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  tokenRequired: {
    alignItems: 'center',
    marginBottom: 24,
  },
  requiredText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  options: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e6e8ff',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  optionSubtext: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
});