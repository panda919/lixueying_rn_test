import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

//= ==third party plugins=======
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, ListItem } from 'react-native-elements';

//= ==custom components & containers  =======
import { Container } from '@components';
import { HomeHeader } from '@containers';

//= ======selectors==========================
import { usersSelector } from '@modules/users/selectors';
//= ======reducer actions====================
import { addNewUsers, resetUsers, reset } from '@modules/users/slice';

//= ==========apis=======================
import { fetchUsersAPI } from '@modules/users/services';
//= =============utils==================================

//= =============utils==================================
import styled from 'styled-components/native';
import { Colors } from '@theme';

//= =============styles==================================
import { RootBox } from '@common/StyledComponents';

import { styles } from './styles';

// AssetType
//= =============images & constants ===============================
//= ============import end ====================
const limitSize = 10;

const HomeScreen = ({ navigation }) => {
  //= ========Hook Init===========
  const dispatch = useDispatch();
  const userList = useSelector(store => usersSelector(store));
  //= ========= Props Section========
  //= ======== State Section========
  const [fetchingMore, setFetchingMore] = useState(false);
  const [isFetchedFullData, setIsFetchedFullData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  //= =========  query Section========
  /** @description: fetch more user list with pagination
   *  @param: page offset value
   */
  const callFetchUserList = useCallback(
    async page => {
      try {
        setFetchingMore(true);
        const { data } = await fetchUsersAPI({
          limit: limitSize,
          page,
        });
        if (data.length < limitSize) {
          setIsFetchedFullData(true);
        }

        dispatch(addNewUsers(data));
        setFetchingMore(false);
        setRefreshing(false);
      } catch (error) {
        setFetchingMore(false);
      }
    },
    [dispatch],
  );
  useEffect(() => {
    dispatch(reset());
    return () => {};
  }, []);
  /** @description: load more user list
   *
   */

  const fetchUserList = useCallback(() => {
    if (fetchingMore || isFetchedFullData || refreshing) {
      return;
    }
    callFetchUserList(parseInt(userList.length / limitSize, 10) + 1);
  }, [callFetchUserList, fetchingMore, isFetchedFullData, refreshing, userList.length]);
  /** @description: refetch load user list
   *
   */
  const onRefetchUserList = useCallback(() => {
    dispatch(resetUsers());
    setIsFetchedFullData(false);
    setRefreshing(true);

    callFetchUserList(1);
  }, [callFetchUserList, dispatch]);
  //= ========= Use Effect Section========
  useEffect(() => {
    fetchUserList();
    return () => {};
  }, []);

  const onEndReachedCalledDuringMomentum = useRef(true);

  const keyExtractor = useCallback(item => item.id.toString(), []);
  const onEndReached = ({ distanceFromEnd }) => {
    if (!onEndReachedCalledDuringMomentum.current) {
      fetchUserList();
      onEndReachedCalledDuringMomentum.current = true;
    }
  };
  const onMomentumScrollBegin = () => {
    onEndReachedCalledDuringMomentum.current = false;
  };
  const renderFooter = useCallback(() => {
    if (!fetchingMore || refreshing) {
      return null;
    }
    return (
      <View style={styles.listFooter}>
        <ActivityIndicator animating size="large" color={Colors.loaderColor} />
      </View>
    );
  }, [fetchingMore, refreshing]);

  const renderUserItem = useCallback(({ item, index }) => {
    return (
      <ListItem containerStyle={styles.itemContainer}>
        <Avatar rounded size="large" source={{ uri: item.avatar }} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.address}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }, []);

  return (
    <Container>
      <HomeHeader title="Users Screen" />
      <View style={styles.contentView}>
        <RootBox full vPadder style={styles.listContainer}>
          <FlatList
            data={userList}
            renderItem={renderUserItem}
            extraData={userList.length}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={1}
            onMomentumScrollBegin={onMomentumScrollBegin}
            ListFooterComponent={renderFooter}
            onRefresh={onRefetchUserList}
            refreshing={refreshing}
          />
        </RootBox>
      </View>
    </Container>
  );
};

export default HomeScreen;
