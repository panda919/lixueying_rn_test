import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, Fonts } from '@theme';
import { Header } from 'react-native-elements';
import { BackgroundCircle } from '@components';
import { Box, Text } from 'native-base';

const AppHeader = () => {
  //= ======== State Section========
  return (
    <>
      <Box>
        <BackgroundCircle />
        <Box position="absolute" pl="10px">
          <Text color={Colors.white} fontSize="50px" fontWeight="bold">
            THINGS
          </Text>
          <Text color={Colors.white} fontSize="35px" fontWeight="bold">
            The App
          </Text>
        </Box>
      </Box>
    </>
  );
};
AppHeader.propTypes = {};
AppHeader.defaultProps = {};
export default React.memo(AppHeader);
