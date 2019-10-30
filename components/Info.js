import React, { Component, useContext, useReducer } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Dimensions,
  Image,
  Text,
} from 'react-native';

import {
  PanGestureHandler,
  State,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import { Ionicons as Icon } from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  createMaterialBottomTabNavigator,
  BottomTabBar,
} from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

const UserContext = React.createContext();
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

const { width, height } = Dimensions.get('window');
const THUMBNAL_WIDTH = 128;

const Thumbnail = ({ user }) => (
  <Image
    source={{
      uri: user.picture || '',
    }}
    style={styles.thumbnail}
  />
);

const LocationView = props => {
  const { location = {} } = useContext(UserContext);
  const { street = '', city = '', state = '' } = location;

  return (
    <View style={styles.infoView}>
      <Text style={styles.label}>My address is:</Text>
      <Text style={styles.text}>{`${street}, ${city}, ${state}`}</Text>
    </View>
  );
};
const PhoneView = props => {
  const { cell = '', phone = '' } = useContext(UserContext);
  return (
    <View style={styles.infoView}>
      <Text style={styles.label}>
        Cell: <Text style={styles.text}>{cell}</Text>
      </Text>
      <Text style={styles.label}>
        Phone : <Text style={styles.text}>{phone}</Text>
      </Text>
    </View>
  );
};
const RegisterView = props => {
  const { username = '', password = '' } = useContext(UserContext);
  return (
    <View style={styles.infoView}>
      <Text style={styles.label}>
        Username: <Text style={styles.text}>{username}</Text>
      </Text>
      <Text style={styles.label}>
        Password : <Text style={styles.text}>{password}</Text>
      </Text>
    </View>
  );
};
const InfoView = props => {
  const { gender = '', name = {} } = useContext(UserContext);
  const { title = '', first = '', last = '' } = name;
  return (
    <View style={styles.infoView}>
      <Text style={styles.label}>
        {' '}
        Name :{' '}
        <Text
          style={
            styles.text
          }>{`${title}. ${first.toUpperCase()} ${last.toUpperCase()}`}</Text>
      </Text>
      <Text style={styles.label}>
        Gender: <Text style={styles.text}>{gender}</Text>
      </Text>
    </View>
  );
};
const OtherView = props => {
  const { registered = '', email = '', SSN = '' } = useContext(UserContext);
  return (
    <View style={styles.infoView}>
      <Text style={styles.label}>
        email: <Text style={styles.text}>{email}</Text>
      </Text>
      <Text style={styles.label}>
        registered : <Text style={styles.text}>{registered}</Text>
      </Text>
      <Text style={styles.label}>
        SSN : <Text style={styles.text}>{SSN}</Text>
      </Text>
    </View>
  );
};

const getTabBarIcon = name => ({ focused, tintColor }) => (
  <Icon
    name={name}
    size={24}
    style={{ color: focused ? '#48fa2d' : tintColor }}
  />
);
const TabBarComponent = props => <BottomTabBar {...props} />;

const TabViews = createAppContainer(
  createBottomTabNavigator(
    {
      other: {
        screen: OtherView,
        navigationOptions: {
          tabBarIcon: getTabBarIcon('ios-contact'),
          title: 'Other',
        },
      },
      info: {
        screen: InfoView,
        navigationOptions: {
          tabBarIcon: getTabBarIcon('ios-clipboard'),
          title: 'Info',
        },
      },
      location: {
        screen: LocationView,
        navigationOptions: {
          tabBarIcon: getTabBarIcon('ios-map'),
          title: 'Location',
        },
      },
      phone: {
        screen: PhoneView,
        navigationOptions: {
          tabBarIcon: getTabBarIcon('ios-call'),
          title: 'Phone',
        },
      },
      register: {
        screen: RegisterView,
        navigationOptions: {
          tabBarIcon: getTabBarIcon('ios-lock'),
          title: 'register',
        },
      },
    },
    {
      initialRouteName: 'location',

      tabBarOptions: {
        showIcon: true,
        showLabel: false,
        indicatorStyle: {
          borderTopWidth: 5,
          width: 100,
          height: 10,
          borderTopColor: '#48fa2d',
        },
      },
      tabBarComponent: props => <TabBarComponent {...props} />,
    }
  )
);

export default ({ removeItem, user }) => {
  const translatePos = new Animated.ValueXY();
  const rotatePos = new Animated.ValueXY();
  const fadeAnim = new Animated.Value(0);

  return (
    <View style={[styles.item]}>
      <Thumbnail user={user} />
      <View style={{ flex: 1, width: '100%' }}>
        <UserProvider value={user}>
          <TabViews />
        </UserProvider>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // position:'absolute'
    // backgroundColor: '#eee',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  thumbnail: {
    width: THUMBNAL_WIDTH,
    height: THUMBNAL_WIDTH,
    borderRadius: THUMBNAL_WIDTH / 2,
    borderWidth: 5,
    borderColor: '#fff',
    position: 'relative',
    top: THUMBNAL_WIDTH / 2,
    zIndex: 10,
  },

  infoView: {
    paddingTop: THUMBNAL_WIDTH / 2,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
});
