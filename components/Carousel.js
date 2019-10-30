import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Dimensions,
  NetInfo,
  Text,
} from 'react-native';
import {
  getUserOffline,
  getUserOnline,
  saveFavourite,
  getUser,
} from './Util';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import _ from 'lodash';
import Info from './Info';

const { width, height } = Dimensions.get('window');
class CardStackImplement extends CardStack {}

export default () => {
  const [users, setUsers] = useState([]);
  const [isNext, setIsNext] = useState(false);
  const [swiped, setSwiped] = useState(0);
  const [favourite, setFavourite] = useState(null);

  const nextUser = async () => {
    if (isNext) {
      let next = swiped + 1;
      if (next >= users.length) {
        setUsers([]);
        setSwiped(0);
      } else {
        setSwiped(next);
      }
      setIsNext(false);
    }
  };
  const loadUsers = async quantity => {
    const users = await getUser(quantity);
    await new Promise((resolve, reject) => {
      setUsers(users);
      resolve();
    }).then(() => {
      this.swiper.initDeck();
    });
  };
  const storeUser = async user => {
    await saveFavourite(user);
    setFavourite(null);
  };
  // get new User
  useEffect(() => {
    if (_.isEmpty(users)) {
      loadUsers(3);
    }
  }, [users]);

  // store  User
  useEffect(() => {
    if (favourite) {
      storeUser(favourite);
    }
  }, [favourite]);
  // swipe
  useEffect(() => {
    nextUser();
  }, [isNext]);

  const renderCarousel = () => (
    <CardStackImplement
      style={styles.content}
      renderNoMoreCards={() => <View />}
      ref={swiper => {
        this.swiper = swiper;
      }}
      onSwiped={() => {
        setIsNext(true);
      }}>
      {users.map((user, index) => {
        return (
          <Card
            key={index}
            style={styles.card}
            onSwipedRight={props => {
              setFavourite(user);
            }}>
            {user && <Info user={user} />}
          </Card>
        );
      })}
    </CardStackImplement>
  );

  return <View style={styles.container}>{!_.isEmpty(users) && renderCarousel()}</View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  content: {
    width: width - 40,
    height: height - 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 5,
    width: width - 40,
    height: height - 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
});
