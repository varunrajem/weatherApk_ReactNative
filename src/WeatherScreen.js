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
  const [currentcity, setCurrentCity] = useState()
  const [refersh, setRefresh] = useState('')
  // console.log(refersh)
  // console.log(currentcity)
  // console.log(city)

  const apiKey = 'a421de0ca7d8fe333ce91c982711a4c9';

  const indianCity = ["Mumbai",
    "Delhi",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Surat",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri-Chinchwad",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Kalyan-Dombivli",
    "Vasai-Virar",
    "Varanasi",
    "Srinagar",
    "Aurangabad",
    "Dhanbad",
    "Amritsar",
    "Navi Mumbai",
    "Allahabad",
    "Howrah",
    "Ranchi",
    "Gwalior",
    "Jabalpur",
    "Coimbatore",
    "Vijayawada",
    "Jodhpur",
    "Madurai",
    "Raipur",
    "Kota",
    "Chandigarh",
    "Guwahati",
    "Solapur",
    "Hubballi-Dharwad",
    "Bareilly",
    "Moradabad",
    "Mysore",
    "Gurgaon",
    "Aligarh",
    "Jalandhar",
    "Tiruchirappalli",
    "Bhubaneswar",
    "Salem",
    "Mira-Bhayandar",
    "Warangal",
    "Thiruvananthapuram",
    "Bhiwandi",
    "Saharanpur",
    "Guntur",
    "Amravati",
    "Bikaner",
    "Noida",
    "Jamshedpur",
    "Bhilai",
    "Cuttack",
    "Kochi",
    "Udaipur",
    "Bhavnagar",
    "Dehradun",
    "Asansol",
    "Nanded",
    "Ajmer",
    "Jamnagar",
    "Ujjain",
    "Sangli",
    "Loni",
    "Jhansi",
    "Pondicherry",
    "Nellore",
    "Jammu",
    "Belagavi",
    "Raurkela",
    "Mangaluru",
    "Tirunelveli",
    "Malegaon",
    "Gaya",
    "Jalgaon",
    "Udaipur",
    "Maheshtala",
    "Tirupur",
    "Davanagere",
    "Kozhikode",
    "Akola",
    "Kurnool",
    "Rajpur Sonarpur",
    "Bokaro",
    "South Dumdum",]

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setRefresh(city);
      setCity('')
      // console.log(response.data)
      setError('');
    } catch (error) {
      setError('City not found');
    }
  };

  const refresh = async () => {
    console.log(refersh)
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${refersh}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      console.log(err)
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

  if (weatherData?.weather[0]?.description === 'broken clouds') {
    fewclouds();
  }

  if (weatherData?.weather[0]?.description === 'fog') {
    fog();
  }
  if (weatherData?.weather[0]?.description === 'overcast clouds') {
    fog();
  }

  const filtered = (city) => {
    const filtereddata = []
    // console.log('apple', city)
    indianCity.forEach((e) => {
      if (e.includes(city)) {
        filtereddata.push(e)
      }
    })
    setCurrentCity(filtereddata)
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
              onChangeText={(text) => { setCity(text); filtered(text); setWeatherData(null); }}
            /><View>{city && currentcity.map((e, i) => {
              return <Text style={{ backgroundColor: 'gray', borderRadius: 5, margin: 2, textAlign: 'center', paddingHorizontal: 12 }} key={i} onPress={() => { setCity(e); setCurrentCity([]) }}>{e === city ? '' : e}</Text>
            })}</View>
            <TouchableOpacity style={styles.button} onPress={getWeatherData}>
              <Text tyle={styles.buttontext}>WEATHER REPORT</Text>
            </TouchableOpacity>
            <View>
              {weatherData && (
                <View style={styles.Card}>

                  <Text style={styles.name}>{weatherData.name.toUpperCase()}</Text>
                  <Text style={styles.desc}>{weatherData.weather[0].description.toUpperCase()}</Text>
                  <Text style={styles.temp}>{Math.round(weatherData.main.temp)}°C</Text>
                  <Text style={styles.lat}>LAT   {weatherData.coord.lat}</Text>
                  <Text style={styles.lon}>LOG   {weatherData.coord.lon}</Text>
                  <TouchableOpacity style={{ backgroundColor: 'blue', padding: 12, borderRadius: 10 }} onPress={refresh}>
                    <Text tyle={styles.buttontext}>Refresh</Text>
                  </TouchableOpacity>
                </View>

              )}
              {error !== '' && <Text style={styles.errorText}>{error}</Text>}
            </View></View>
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
