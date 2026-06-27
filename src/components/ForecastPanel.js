import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {WEATHER_THEMES} from '../constants/weatherThemes';
import {formatTemp, getDayName} from '../utils/weatherUtils';

const ForecastPanel = ({forecastData, tempUnit}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>5-Day Forecast</Text>
      <View style={styles.forecastCard}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.forecastScroll}>
          {forecastData.map((item, idx) => {
            const condition = item.weather[0]?.main || 'Default';
            const theme = WEATHER_THEMES[condition] || WEATHER_THEMES.Default;
            return (
              <View key={idx} style={styles.forecastItem}>
                <Text style={styles.forecastDay}>
                  {idx === 0 ? 'Today' : getDayName(item.dt_txt)}
                </Text>
                <Text style={styles.forecastEmoji}>{theme.emoji}</Text>
                <Text style={styles.forecastTemp}>
                  {formatTemp(item.main.temp, tempUnit)}
                </Text>
                <Text style={styles.forecastDesc}>{item.weather[0].main}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 12,
    paddingLeft: 4,
  },
  forecastCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  forecastScroll: {
    paddingHorizontal: 10,
  },
  forecastItem: {
    alignItems: 'center',
    width: 85,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingVertical: 12,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  forecastDay: {
    color: '#E2E8F0',
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  forecastEmoji: {
    fontSize: 28,
    marginVertical: 6,
  },
  forecastTemp: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-Bold',
  },
  forecastDesc: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    marginTop: 4,
  },
});

export default ForecastPanel;
