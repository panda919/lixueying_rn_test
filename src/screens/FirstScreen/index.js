import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, StatusBar, Platform, TouchableOpacity, FlatList } from 'react-native';
//= ==third party plugins=======
import { Box, Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Avatar, ListItem, Icon, colors } from 'react-native-elements';
//= ==custom components & containers  =======
import { Content, Container, FocusAwareStatusBar, BackgroundCircle } from '@components';
import { AppHeader, AppBottom } from '@containers';
//= ======selectors==========================
import { featuresSelector, activeFeatureIdsSelector } from '@modules/features/selectors';
//= ======reducer actions====================
import {
  setFeatures,
  setActiveFeatures,
  resetFeatures,
  resetActiveFeatures,
} from '@modules/features/slice';

//= ==========apis=======================
import { fetchFeaturesAPI } from '@modules/features/services';

//= =============utils==================================
import styled from 'styled-components/native';
import { Colors } from '@theme';

//= =============styles==================================
import { hp } from '@src/common/responsive';

import { styles } from './styles';

//= =============images & constants ===============================
const limitSize = 10;
const ActiveIdsLimit = 5;
const ItemContent = React.memo(({ item, index, isActive, onPressItem }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPressItem(item?.id);
      }}>
      <Box
        flex={1}
        width="100%"
        flexDirection="row"
        borderColor={Colors.borderColor}
        backgroundColor={Colors.itemColors[index % 10]}
        justifyContent="space-between"
        alignItems="center"
        borderRadius="8px"
        mb="10px"
        py="10px"
        px="5px">
        <Box />
        <Text color={Colors.white} fontSize="25px">
          {item?.name}
        </Text>
        <Box>
          {isActive ? (
            <Box
              width="30px"
              height="30px"
              borderRadius="15px"
              backgroundColor={Colors.iconBackColor}
              justifyContent="center">
              <Icon name="check" size={20} type="antdesign" color={Colors.black} />
            </Box>
          ) : null}
        </Box>
      </Box>
    </TouchableOpacity>
  );
});

const FirstScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const featureList = useSelector(store => featuresSelector(store));
  const activeFeatureIds = useSelector(store => activeFeatureIdsSelector(store));
  //= ======== State Section========
  const [fetchingMore, setFetchingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const callFetchFeatureList = useCallback(
    async page => {
      try {
        setFetchingMore(true);
        const { data } = await fetchFeaturesAPI({
          limit: limitSize,
          page,
        });
        dispatch(setFeatures(data));
        setFetchingMore(false);
      } catch (error) {
      } finally {
        setFetchingMore(false);
        setRefreshing(false);
      }
    },
    [dispatch],
  );

  const fetchFeaturesList = useCallback(() => {
    if (fetchingMore || refreshing) {
      return;
    }
    callFetchFeatureList(1);
  }, [callFetchFeatureList, fetchingMore, refreshing]);

  //= ========= Use Effect Section========
  useEffect(() => {
    if (featureList.length === 0 && !fetchingMore) {
      onRefetchFeaturesList();
    }

    return () => {};
  }, [featureList, fetchingMore, onRefetchFeaturesList]);

  const onRefetchFeaturesList = useCallback(() => {
    dispatch(resetActiveFeatures());
    setRefreshing(true);
    fetchFeaturesList();
  }, [dispatch, fetchFeaturesList]);
  const updateActiveItem = useCallback(
    id => {
      const existing = activeFeatureIds.includes(id);
      if (existing) {
        dispatch(setActiveFeatures(_.filter(activeFeatureIds, item => item !== id)));
      } else {
        dispatch(setActiveFeatures(_.concat(activeFeatureIds, id)));
      }
    },
    [activeFeatureIds, dispatch],
  );

  const keyExtractor = useCallback(item => item.id.toString(), []);
  const renderItem = useCallback(
    ({ item, index }) => {
      const existing = activeFeatureIds.includes(item.id);
      return (
        <ItemContent item={item} index={index} onPressItem={updateActiveItem} isActive={existing} />
      );
    },
    [activeFeatureIds, updateActiveItem],
  );
  return (
    <Container>
      <Box flex={1} justifyContent="space-between">
        <AppHeader />
        <Box flex={1} flexGrow={1} px="5px" justifyContent="space-between" my="25px">
          <FlatList
            data={featureList}
            renderItem={renderItem}
            extraData={featureList.length}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            onRefresh={onRefetchFeaturesList}
            refreshing={refreshing}
          />
        </Box>

        <AppBottom
          buttonTitle="Next"
          onPress={() => {
            navigation.navigate('Second');
          }}
          isDisabled={activeFeatureIds.length < ActiveIdsLimit}
        />
      </Box>
    </Container>
  );
};

export default FirstScreen;
