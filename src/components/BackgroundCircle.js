import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Box, Text } from 'native-base';
import { Colors } from '@theme';
import { adjustFontSize, wp, hp } from '@common/responsive';

const RADIUS = wp(968);
const BackgroundCircle = ({ isRight, isTop = true, children }) => {
  if (isTop) {
    return (
      <Box
        backgroundColor={Colors.grey}
        width={`${RADIUS}px`}
        height={`${RADIUS}px`}
        borderRadius={`${RADIUS / 2}px`}
        ml={`-${RADIUS * 0.4}px`}
        mt={`-${RADIUS * 0.77}px`}
      />
    );
  } else {
    return (
      <Box
        backgroundColor={Colors.grey}
        width={`${RADIUS}px`}
        height={`${RADIUS}px`}
        borderRadius={`${RADIUS / 2}px`}
        mb={`-${RADIUS * 0.8}px`}
        ml={isRight ? `-${RADIUS * 0.4}px` : 0}
      />
    );
  }
};

BackgroundCircle.propTypes = {
  isRight: PropTypes.bool,
};
BackgroundCircle.defaultProps = {
  isRight: false,
};
export default BackgroundCircle;
