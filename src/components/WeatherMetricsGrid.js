import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {formatTemp, formatLocalTime} from '../utils/weatherUtils';

const WeatherMetricsGrid = ({weatherData, tempUnit}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Weather Details</Text>
      <View style={styles.metricsGrid}>
        <View style={styles.metricCell}>
          <Text style={styles.metricEmoji}>🌡️</Text>
          <Text style={styles.metricLabel}>Feels Like</Text>
          <Text style={styles.metricValue}>
            {formatTemp(weatherData.main.feels_like, tempUnit)}
          </Text>
        </View>

        <View style={styles.metricCell}>
          <Text style={styles.metricEmoji}>💧</Text>
          <Text style={styles.metricLabel}>Humidity</Text>
          <Text style={styles.metricValue}>{weatherData.main.humidity}%</Text>
        </View>

        <View style={styles.metricCell}>
          <Text style={styles.metricEmoji}>💨</Text>
          <Text style={styles.metricLabel}>Wind Speed</Text>
          <Text style={styles.metricValue}>{weatherData.wind.speed} m/s</Text>
        </View>

        <View style={styles.metricCell}>
          <Text style={styles.metricEmoji}>🧭</Text>
          <Text style={styles.metricLabel}>Pressure</Text>
          <Text style={styles.metricValue}>
            {weatherData.main.pressure} hPa
          </Text>
        </View>

        <View style={styles.metricCell}>
          <Text style={styles.metricEmoji}>🌅</Text>
          <Text style={styles.metricLabel}>Sunrise</Text>
          <Text style={styles.metricValue}>
            {formatLocalTime(weatherData.sys.sunrise, weatherData.timezone)}
          </Text>
        </View>

        <View style={styles.metricCell}>
          <Text style={styles.metricEmoji}>🌇</Text>
          <Text style={styles.metricLabel}>Sunset</Text>
          <Text style={styles.metricValue}>
            {formatLocalTime(weatherData.sys.sunset, weatherData.timezone)}
          </Text>
        </View>
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCell: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  metricEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  metricLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  metricValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Bold',
  },
});

export default WeatherMetricsGrid;
