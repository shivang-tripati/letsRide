import { Text, View } from 'react-native'
import React, { Component } from 'react'
import tw from 'twrnc'
import { mapStyle } from '../global/mapStyle';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

// when you have so much functionality (states life cycle to be managed) use class componets.
export class MapComponent extends Component {
  render() {
    return (
      <View>
        <MapView
          
          provider={PROVIDER_GOOGLE}
          style={tw`h-full w-full`}
          customMapStyle={mapStyle}
          showsUserLocation={true}
          followsUserLocation={true}
           // to move map effectively

        >
          
  
        </MapView>
      </View>
    )
  }
}

export default MapComponent