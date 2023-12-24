/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, StyleSheet, ImageBackground, TextInput, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Sound from 'react-native-sound';
import BackgroundImg from '../assets/background.png';

const WeatheerScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'a421de0ca7d8fe333ce91c982711a4c9';

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      console.log(response.data)
      setError('');
    } catch (error) {
      setError('City not found');
      setWeatherData(null);
    }
  };

  const haze = () => {
    var whoosh = new Sound('thunder.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

      // Play the sound with an onEnd callback
      whoosh.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }

  const clearsky = () => {
    var whoosh = new Sound('rain.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

      // Play the sound with an onEnd callback
      whoosh.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }

  const fewclouds = () => {
    var whoosh = new Sound('wind.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

      // Play the sound with an onEnd callback
      whoosh.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }

  const fog = () => {
    var whoosh = new Sound('wind.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

      // Play the sound with an onEnd callback
      whoosh.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }

  if (weatherData?.weather[0]?.description === 'haze') {
    haze();
  }
  if (weatherData?.weather[0]?.description === 'clear sky') {
    clearsky();
  }

  if (weatherData?.weather[0]?.description === 'few clouds') {
    fewclouds();
  }

  if (weatherData?.weather[0]?.description === 'fog') {
    fog();
  }


  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={BackgroundImg} resizeMode="cover" style={styles.image}>
          <Text style={styles.title}>WEATHER FLIX</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              style={styles.input}
              placeholder="Enter city"
              value={city}
              onChangeText={setCity}
            />
            <TouchableOpacity style={styles.button} onPress={getWeatherData}>
              <Text tyle={styles.buttontext}>WEATHER REPORT</Text>
            </TouchableOpacity>
            {weatherData && (
              <View style={styles.Card}>
                <Text style={styles.name}>{weatherData.name.toUpperCase()}</Text>
                <Text style={styles.desc}>{weatherData.weather[0].description.toUpperCase()}</Text>
                <Text style={styles.temp}>{Math.round(weatherData.main.temp)}°C</Text>
                <Text style={styles.lat}>LAT   {weatherData.coord.lat}</Text>
                <Text style={styles.lon}>LOG   {weatherData.coord.lon}</Text>
              </View>
            )}
            {error !== '' && <Text style={styles.errorText}>{error}</Text>}
          </View>
        </ImageBackground>
      </View>
    </>
  );
};
export default WeatheerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 2,
    fontFamily: 'Poppins-Bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    marginTop: 16,
    padding: 8,
    width: '80%',
  },
  Card: {
    width: 250,
    height: 350,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    fontFamily: 'Poppins-Bold',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: 160,
    backgroundColor: 'skyblue',
    borderRadius: 25,
  },
  buttontext: {
    fontWeight: 'bold',
  },
  name: {
    color: 'white',
    fontWeight: '900',
    fontSize: 30,
    letterSpacing: 3,
  },
  desc: {
    color: 'white',
    fontWeight: '300',
    fontSize: 25,
  },
  temp: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
  },
  lon: {
    color: 'white',
    fontWeight: '200',
    fontSize: 20,
    textAlign: 'left',
  },
  lat: {
    color: 'white',
    fontWeight: '200',
    fontSize: 20,
    textAlign: 'right',
  },
},);
