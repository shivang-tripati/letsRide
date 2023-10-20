import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, Dimensions } from 'react-native';
import tw from 'twrnc';
import { Input } from '@rneui/themed';
import { Divider, Icon } from 'react-native-elements'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { Button, Image } from '@rneui/themed';
import { filterData} from '../global/data';
import { carsAround } from '../global/data';
import { mapStyle } from '../global/mapStyle';

import { getStatusBarHeight } from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();
const SCREEN_WIDTH = Dimensions.get('window').width;
console.log(SCREEN_WIDTH);


const Item = () => (
  <ScrollView>
  <FlatList
    contentContainerStyle={{flex:1, justifyContent:'space-between' }} // Remove style attribute causing the error

    data={filterData}
    keyExtractor={(item) => item.id}
    horizontal={true}
    renderItem={({ item }) => (
      <View style={tw`gap-1`}>
        <View>
          <Image
            borderRadius={16}
            style={tw`h-14 w-16`} source={item.image}
          />
        </View>
        <View style={tw`items-center font-semibold`}>
          <Text>{item.name}</Text>
        </View>
      </View>
    )}

  />
  </ScrollView>
);

 const Locations = () => {
  return (
    <View style={tw`flex-row m-5 `}>
        <View style={tw`p-3 rounded-2xl mr-4 bg-gray-200`}>
          <Icon
            type="material-community"
            name="map-marker"
            color="#000000"
            size={23}
          />   
        </View>
        <View style={tw`flex-row justify-evenly`}>
        <View style={tw} >
          <Text style={tw`text-base font-semibold`} >32/11 GD Road</Text>
          <Text style={tw`text-gray-500`} >Gurudev, knapur, UP</Text>
        </View>
        <View style={tw`mt-2 mx-40 mr-0`}>
          <Icon
            type="material-community"
            name="chevron-right"
            color="#c0c0c0"
            size={25}
          />
        </View>
        </View>
      </View>

  );

}



const HomeScreen = ({navigation}) => {

  const [latLng, setLatLng] = useState({})
  const getLocation = async() => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {

      try {
        const location = await Location.getCurrentPositionAsync({});
        const {lattitude, longitude} = location.coords;
        console.log(location.coords);
        setLatLng({lattitude: lattitude, longitude:longitude}); 
      } catch (err) {
        console.error(err);
      }      
    } else {
      console.log('Permission to access location was denied');
      return;
    }    
  }

  const _map = useRef(1);

  useEffect(() => {
    getLocation();
  }, [])
  



  return (
    <View style={tw`bg-white flex-1`}>
      <View style={tw`bg-blue-600 h-4/30 flex-row`}>
        <View style={tw`ml-4 mt-12`}>
          <Icon
            type="material-community"
            name="menu"
            color="#ffffff"
            size={40}
          />
        </View>
      </View>
      <ScrollView bounces={false}>
        <View style={tw`bg-blue-600 `}>
          <View style={tw`ml-8`}>
          <View>
            <Text style={tw`mt-5  text-white text-2xl`}>Destress your commute</Text>
          </View>
          <View>
            <Text style={tw`mt-5 text-white text-base flex-auto`}>Read a book. Take a nap. Stare out the window</Text>
          </View>
          </View>
          <View style={tw`flex-row bg-blue-600`}>
            <View style={tw`ml-5 mt-5 `}>
              <Button
                title="Book a Ride"
                containerStyle={{ width: 120, }}
                buttonStyle={{ backgroundColor: 'black', borderRadius:40, height:42 }}
                onPress={() => {navigation.navigate("RequestScreen")}}
              />
            </View>
            <View style={tw`ml-44`}>
              <Image
                style={tw`h-22 w-24`}
                source={require('../../assets/uberCar.png')}
              />
            </View>
          </View>
        </View>
        {/* flat list */}
        <View style={tw`m-5`}>
          <Item/>
          
        </View>

        {/* input */}
      <View style={tw`ml-5 mr-5  h-13 flex-row bg-gray-200 justify-between rounded-lg`}>
        <View style={tw`w-60 p-1 flex-row `}>
            <Input           
             placeholder='Where to?' placeholderTextColor="black" 
             inputMode='text' inputContainerStyle={{borderBottomWidth:0}}
    
            />
          </View>
          <View style={tw`items-center flex-row gap-1 bg-white rounded-2xl p-1 h-9 m-2`}>
            <Icon
             type="material-community"
             name="clock-time-four"
             color="#0c0c0c"
             size={25}
            />
            <Text>Now</Text>
            <Icon
             type="material-community"
             name="chevron-down"
             color="#000000"
             size={25}
            />
        </View>
      </View> 
 
      
      {/* location suggestion */}
      <Locations/>
      <Divider/>
      <Locations/>
      
      {/*Near Cars */}
      <Text style={tw`text-2xl font-medium ml-5`}>Around You</Text>

      <View style={{alignItems:"center", justifyContent:"center"}} >
        <MapView
          ref={_map}
          provider={PROVIDER_GOOGLE}
          style={[{height:200},tw`m-3 w-${SCREEN_WIDTH*0.22}`]}
          customMapStyle={mapStyle}
          showsUserLocation={true}
          followsUserLocation={true}
          initialRegion={{...carsAround[0], latitudeDelta:0.008, longitudeDelta:0.008}} // to move map effectively

        >
          {carsAround.map((item, index) => 
            <Marker
            coordinate={item}
            key={index.toString()} 
            title='Car'
            
            >
              <Image
               source={require('../../assets/carMarker.png')}
               style={tw`h-14, w-5`}
               resizeMode='center'
              />
            </Marker>
          )}
  
        </MapView>
      </View>

      

        
      </ScrollView>
      <StatusBar style="light" backgroundColor="#2058c0" translucent={true} />
    </View>
  );
};

export default HomeScreen;

