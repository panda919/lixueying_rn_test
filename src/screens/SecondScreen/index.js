import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, StatusBar, Platform, TouchableOpacity, FlatList } from 'react-native';
//= ==third party plugins=======
import { Box, Text, HStack } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Avatar, ListItem, Icon, colors } from 'react-native-elements';
//= ==custom components & containers  =======
import { Content, Container, FocusAwareStatusBar, BackgroundCircle } from '@components';
import { AppHeader, AppBottom } from '@containers';
//= ======selectors==========================
import {
  featuresSelector,
  activeFeatureIdsSelector,
  activeFeaturesSelector,
} from '@modules/features/selectors';
//= ======reducer actions====================
import { setFeatures, setActiveFeatures, resetFeatures } from '@modules/features/slice';

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
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const SecondScreen = ({ navigation, route }) => {
  const activeFeatures = useSelector(store => activeFeaturesSelector(store));
  const { selectedItem, readyItems } = useMemo(() => {
    const index = getRandomArbitrary(0, activeFeatures.length - 1);
    if (index >= 0) {
      return {
        selectedItem: activeFeatures[index],
        readyItems: _.filter(activeFeatures, item => item.id !== activeFeatures[index].id),
      };
    } else {
      return { selectedItem: null, readyItems: [] };
    }
  }, []);
  //= ======== State Section========

  const keyExtractor = useCallback(item => item.id.toString(), []);
  const renderItem = useCallback(({ item, index }) => {
    return <ItemContent item={item} index={index} />;
  }, []);
  return (
    <Container>
      <Box flex={1} justifyContent="space-between">
        <AppHeader />
        <HStack flex={1} flexGrow={1} my="25px" px="15px" justifyContent="space-between">
          <Box flex={1} flexGrow={1} mr="5px">
            <FlatList
              data={readyItems}
              renderItem={renderItem}
              extraData={readyItems.length}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
            />
          </Box>
          <Box
            flex={1}
            backgroundColor={Colors.grey}
            ml="5px"
            py="5px"
            px="5px"
            aspectRatio={1}
            borderRadius="8px"
            alignItems="center"
            justifyContent="space-between">
            <Text color={Colors.white} fontSize="18px">
              Chosen Thing:
            </Text>
            <Text color={Colors.white} fontSize="35px" numberOfLines={2}>
              {selectedItem?.name}
            </Text>
            <Box />
          </Box>
        </HStack>

        <AppBottom
          buttonTitle="Back"
          onPress={() => {
            navigation.goBack();
          }}
          isRight={true}
        />
      </Box>
    </Container>
  );
};

export default SecondScreen;
