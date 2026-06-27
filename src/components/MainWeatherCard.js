import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {formatTemp} from '../utils/weatherUtils';

const MainWeatherCard = ({weatherData, activeTheme, tempUnit}) => {
  return (
    <View style={styles.mainWeatherCard}>
      <Text style={styles.cityText}>
        {weatherData.name}, {weatherData.sys.country}
      </Text>
      <Text style={styles.weatherIconEmoji}>{activeTheme.emoji}</Text>
      <Text style={styles.temperatureText}>
        {formatTemp(weatherData.main.temp, tempUnit)}
      </Text>
      <Text style={styles.descriptionText}>
        {weatherData.weather[0].description.toUpperCase()}
      </Text>

      <View style={styles.minMaxRow}>
        <Text style={styles.minMaxText}>
          Min: {formatTemp(weatherData.main.temp_min, tempUnit)}
        </Text>
        <Text style={styles.minMaxDivider}>|</Text>
        <Text style={styles.minMaxText}>
          Max: {formatTemp(weatherData.main.temp_max, tempUnit)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWeatherCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 24,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  cityText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  weatherIconEmoji: {
    fontSize: 80,
    marginVertical: 10,
  },
  temperatureText: {
    color: '#FFF',
    fontSize: 64,
    fontWeight: '200',
    fontFamily: 'Poppins-Bold',
    marginVertical: 5,
  },
  descriptionText: {
    color: '#E2E8F0',
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    marginBottom: 15,
  },
  minMaxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  minMaxText: {
    color: '#E2E8F0',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  minMaxDivider: {
    color: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 12,
    fontSize: 14,
  },
});

export default MainWeatherCard;
