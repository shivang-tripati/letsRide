import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer'
import { HomeStack } from './StackNavigators';
import { Icon } from 'react-native-elements';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator>
        <Drawer.Screen
            name="HomeStack"
            component={HomeStack}
            options = {{
                title:"Home",
                drawerIcon:
                 ({focused, size}) =>  <Icon 
                                       type = 'material-community'
                                       name = 'home'
                                       color={focused?'#7cc': colors.gre2}
                
                                        />,
                headerShown : false
            }}
            
        />
        </Drawer.Navigator>
    )
}