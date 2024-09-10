import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterUser from './src/screens/RegisterUser';
import UserList from './src/screens/UserList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Route() {
    const Tab = createBottomTabNavigator(); 
  return (
     <NavigationContainer>
      <Tab.Navigator
        >
        <Tab.Screen name="Register" component={RegisterUser}
            options={{
            tabBarIcon: () => (
                <MaterialCommunityIcons name="badge-account" size={28} />
            ),
            }}
        />
        <Tab.Screen name="List" component={UserList}
        options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="table" size={28} />
            ),
            }} 
        />
      </Tab.Navigator>
    </NavigationContainer>

  )
}