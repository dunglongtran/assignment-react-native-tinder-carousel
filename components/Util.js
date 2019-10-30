import React from 'react';
import { AsyncStorage, NetInfo } from 'react-native';
import _ from 'lodash';
const USER_URL = 'https://randomuser.me/api/0.4/?randomapi';
export async function getUserOnline(quantity = 1) {
  try {
    const data = await fetch(`${USER_URL}&results=${quantity}`).then(res => res.json());
    return _.flatMap(data.results, ({ user }) => user);
  } catch (error) {
    console.error(error);
  }
}
export async function getUserOffline(quantity) {
  try {
    const favourites = await AsyncStorage.getItem('favourites');
    return _.slice(_.shuffle(JSON.parse(favourites)), 0, quantity);
  } catch (error) {
    console.error(error);
  }
}
export async function saveFavourite(user) {
  try {
    const data = await AsyncStorage.getItem('favourites');
    const favourites = data ? JSON.parse(data) : [];
    const exist = favourites.find(item => _.isEqual(item, user));
    if (!exist) {
      const nextFavourites = [...favourites, user];
      await AsyncStorage.setItem('favourites', JSON.stringify(nextFavourites));
    }
  } catch (error) {
    console.error(error);
  }
}
export async function getUser(quantity) {
  const isConnected = await NetInfo.isConnected.fetch();
  console.log(`loadUsers from ${isConnected ? 'online' : 'offline'}`);
  return isConnected ? getUserOnline(quantity) : getUserOffline(quantity);
}
