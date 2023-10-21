import { View, Text, ScrollView, FlatList, Dimensions } from 'react-native';
import React from 'react'
import tw from 'twrnc';
import MapComponent from '../components/MapComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Icon } from 'react-native-elements';

const RequestScreen = () => {
  return (
   
    <View style={tw`mt-8 ml-7 mr-7 flex-1`}>
      <View style={tw`flex-row`}>
      <View style={tw` w-8 ml-5 `}>
        <Icon
            name='arrow-back'
            type='materialicons'
            size={26}
            color='black'

        />

      </View>
      <View style={tw`ml-15 flex-row`}>
        <TouchableOpacity>
          <View style={tw`flex-row`}>
            <Avatar
                 rounded
                 avatarStyle={{}}
                 size={30}
                 source={require('../../assets/profilePic.jpg')}
            />
            <Text style={tw`ml-5`} >For Someone</Text>
            <Icon
               type='material-community'
               name='chevron-down'
               color="#0c0c0c"
            />
          </View>
        </TouchableOpacity>
      </View>
      </View>
      
      <MapComponent/>
      </View>
    
  )
}

export default RequestScreen