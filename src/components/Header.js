import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const Header = ({ isMuted, onToggleMute, tempUnit, onToggleTempUnit }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>ClimateX</Text>

      {/* Quick controls (Toggle Unit / Mute sound) */}
      <View style={styles.headerControls}>
        <TouchableOpacity
          style={styles.controlIconBtn}
          onPress={onToggleMute}
          activeOpacity={0.7}>
          <Text style={styles.controlIconText}>{isMuted ? '🔇' : '🔊'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlBtn}
          onPress={onToggleTempUnit}
          activeOpacity={0.7}>
          <Text style={styles.controlBtnText}>
            {tempUnit === 'C' ? '°C' : '°F'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 35,
    paddingBottom: 15,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 26,
    letterSpacing: 2,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlIconBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  controlIconText: {
    fontSize: 18,
  },
  controlBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  controlBtnText: {
    color: '#FFF',
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default Header;
