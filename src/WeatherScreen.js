/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  PermissionsAndroid,
  Keyboard,
  Text,
} from 'react-native';
import axios from 'axios';
import Sound from 'react-native-sound';
import Geolocation from '@react-native-community/geolocation';

// Import local constants and utilities
import { apiKey } from './constants/config';
import { WEATHER_THEMES } from './constants/weatherThemes';

// Import components
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MainWeatherCard from './components/MainWeatherCard';
import ForecastPanel from './components/ForecastPanel';
import WeatherMetricsGrid from './components/WeatherMetricsGrid';

import BackgroundImg from '../assets/background.png';

// Configure Sound behavior
Sound.setCategory('Playback');

const WeatherScreen = () => {
  const [cityQuery, setCityQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Settings states
  const [tempUnit, setTempUnit] = useState('C'); // 'C' or 'F'
  const [isMuted, setIsMuted] = useState(false);
  const activeSoundRef = useRef(null);
  const [currentCityName, setCurrentCityName] = useState('');
  const [currentCoords, setCurrentCoords] = useState(null);

  // Debouncing effect for search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(cityQuery);
    }, 450); // 450ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [cityQuery]);

  // Fetch suggestions when debounced query updates
  useEffect(() => {
    if (debouncedQuery.trim().length >= 3) {
      fetchSuggestions(debouncedQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  // Initial load: GPS permission -> Coords lookup -> Fallback to IP Geolocation
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        return true;
      }
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Weather Flix Location Access',
            message: 'Weather Flix needs access to your location to display the current weather in your area.',
            buttonPositive: 'Allow Location Access',
            buttonNegative: 'Deny',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Location permission request error:', err);
        return false;
      }
    };

    const loadInitialLocation = async () => {
      setIsLoading(true);
      setError('');
      const hasPermission = await requestLocationPermission();

      if (hasPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentCoords({ latitude, longitude });
            fetchWeatherData({ latitude, longitude });
          },
          (err) => {
            console.log('GPS coordinates retrieval failed, falling back to IP Geolocation:', err);
            fetchIPLocation();
          },
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
        );
      } else {
        console.log('Location permission denied, falling back to IP Geolocation');
        fetchIPLocation();
      }
    };

    const fetchIPLocation = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        if (response.data && response.data.city) {
          fetchWeatherData(response.data.city);
        } else {
          fetchWeatherData('New Delhi');
        }
      } catch (err) {
        console.log('IP location retrieval failed, loading default New Delhi:', err);
        fetchWeatherData('New Delhi');
      }
    };

    loadInitialLocation();
  }, []);

  // Clean up active sound on unmount
  useEffect(() => {
    return () => {
      if (activeSoundRef.current) {
        activeSoundRef.current.stop();
        activeSoundRef.current.release();
      }
    };
  }, []);

  // Play Sound Effect based on Weather Description
  const playSoundEffect = useCallback((description) => {
    if (isMuted) {
      return;
    }

    // Release any previously playing sound
    if (activeSoundRef.current) {
      activeSoundRef.current.stop();
      activeSoundRef.current.release();
      activeSoundRef.current = null;
    }

    let soundFile = '';
    const desc = description.toLowerCase();

    if (desc.includes('thunder') || desc.includes('storm')) {
      soundFile = 'thunder.mp3';
    } else if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('shower')) {
      soundFile = 'rain.mp3';
    } else if (desc.includes('clear') || desc.includes('sun')) {
      soundFile = 'sunny.mp3';
    } else if (
      desc.includes('cloud') ||
      desc.includes('wind') ||
      desc.includes('fog') ||
      desc.includes('overcast') ||
      desc.includes('mist') ||
      desc.includes('haze')
    ) {
      soundFile = 'wind.mp3';
    }

    if (soundFile) {
      const sound = new Sound(soundFile, Sound.MAIN_BUNDLE, (err) => {
        if (err) {
          console.log('Failed to load sound', soundFile, err);
          return;
        }
        activeSoundRef.current = sound;
        sound.play((success) => {
          if (success) {
            console.log('Finished playing sound successfully');
          } else {
            console.log('Playback failed due to audio decoding errors');
          }
          sound.release();
          if (activeSoundRef.current === sound) {
            activeSoundRef.current = null;
          }
        });
      });
    }
  }, [isMuted]);

  // Trigger sound when weather data updates or mute state changes
  useEffect(() => {
    if (isMuted) {
      if (activeSoundRef.current) {
        activeSoundRef.current.stop();
        activeSoundRef.current.release();
        activeSoundRef.current = null;
      }
    } else if (weatherData) {
      const desc = weatherData.weather[0]?.description || '';
      playSoundEffect(desc);
    }
  }, [weatherData, isMuted, playSoundEffect]);

  // Fetch Full Weather Data (Current + Forecast)
  const fetchWeatherData = async (locationParam) => {
    setIsLoading(true);
    setError('');
    setSuggestions([]);
    setCityQuery('');

    try {
      let currentUrl = '';
      let forecastUrl = '';

      if (typeof locationParam === 'object' && locationParam.latitude && locationParam.longitude) {
        const { latitude, longitude } = locationParam;
        currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      } else {
        currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(locationParam)}&appid=${apiKey}&units=metric`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(locationParam)}&appid=${apiKey}&units=metric`;
      }

      const currentRes = await axios.get(currentUrl);
      const forecastRes = await axios.get(forecastUrl);

      setWeatherData(currentRes.data);
      setCurrentCityName(currentRes.data.name);

      // Process 5 distinct days of forecasts
      if (forecastRes.data && forecastRes.data.list) {
        const uniqueDays = [];
        const seenDates = new Set();

        for (const item of forecastRes.data.list) {
          const dateStr = item.dt_txt.split(' ')[0];
          if (!seenDates.has(dateStr)) {
            seenDates.add(dateStr);
            uniqueDays.push(item);
          }
          if (uniqueDays.length >= 5) {break;}
        }
        setForecastData(uniqueDays);
      }
    } catch (err) {
      console.log('Error fetching weather:', err);
      setError('City not found. Please try another city.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Pull-to-refresh handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    if (currentCoords) {
      fetchWeatherData(currentCoords);
    } else if (currentCityName) {
      fetchWeatherData(currentCityName);
    } else {
      fetchWeatherData('New Delhi');
    }
  };

  const fetchSuggestions = async (text) => {
    setIsSearching(true);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(text)}&limit=5&appid=${apiKey}`
      );
      if (res.data) {
        const items = res.data.map((item) => ({
          name: item.name,
          country: item.country,
          state: item.state || '',
          fullName: `${item.name}${item.state ? `, ${item.state}` : ''}, ${item.country}`,
        }));
        setSuggestions(items);
      }
    } catch (err) {
      console.log('Error fetching suggestions:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Refined Autocomplete Item selection handler
  const handleSelectSuggestion = (fullName) => {
    Keyboard.dismiss();
    setSuggestions([]);
    setCityQuery('');
    setCurrentCoords(null); // Clear coordinates override since we searched a specific city
    fetchWeatherData(fullName);
  };

  // Determine active theme based on weather condition
  const weatherCondition = weatherData?.weather[0]?.main || 'Default';
  const activeTheme = WEATHER_THEMES[weatherCondition] || WEATHER_THEMES.Default;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground source={BackgroundImg} resizeMode="cover" style={styles.backgroundImage}>
        {/* Dynamic theme color overlay for background wash */}
        <View style={[styles.backgroundWash, { backgroundColor: activeTheme.color }]} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardContainer}
        >
          {/* Header Bar */}
          <Header
            isMuted={isMuted}
            onToggleMute={() => setIsMuted(!isMuted)}
            tempUnit={tempUnit}
            onToggleTempUnit={() => setTempUnit(tempUnit === 'C' ? 'F' : 'C')}
          />

          {/* Search bar and suggestions dropdown */}
          <SearchBar
            cityQuery={cityQuery}
            onChangeText={(text) => setCityQuery(text)}
            onSubmit={() => {
              if (cityQuery.trim()) {
                handleSelectSuggestion(cityQuery.trim());
              }
            }}
            isSearching={isSearching}
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
            onClear={() => {
              setCityQuery('');
              setSuggestions([]);
            }}
          />

          {/* Main Weather Content */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={() => {
              setSuggestions([]);
              Keyboard.dismiss();
            }}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor="#FFF"
                colors={['#FFF']}
              />
            }
          >
            {isLoading && !isRefreshing ? (
              <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#FFF" />
                <Text style={styles.loadingText}>Fetching latest forecasts...</Text>
              </View>
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
              </View>
            ) : weatherData ? (
              <View style={styles.weatherDashboard}>
                {/* Main Glassmorphism Card */}
                <MainWeatherCard
                  weatherData={weatherData}
                  activeTheme={activeTheme}
                  tempUnit={tempUnit}
                />

                {/* 5-Day Forecast Panel */}
                <ForecastPanel
                  forecastData={forecastData}
                  tempUnit={tempUnit}
                />

                {/* Weather Metrics Grid */}
                <WeatherMetricsGrid
                  weatherData={weatherData}
                  tempUnit={tempUnit}
                />
              </View>
            ) : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundWash: {
    ...StyleSheet.absoluteFillObject,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    color: '#FFF',
    marginTop: 15,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  errorText: {
    color: '#FCA5A5',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  weatherDashboard: {
    marginTop: 10,
  },
});
