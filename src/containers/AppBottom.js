import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, Fonts } from '@theme';
import { Header } from 'react-native-elements';
import { BackgroundCircle } from '@components';
import { Box, Text, Pressable } from 'native-base';

const AppBottom = ({ buttonTitle, onPress, isDisabled, isRight }) => {
  //= ======== State Section========
  return (
    <>
      <Box>
        <BackgroundCircle isTop={false} isRight={isRight} />
        <Box position="absolute" left={!isRight ? null : 5} right={isRight ? null : 5} bottom={5}>
          <Pressable onPress={onPress} disabled={isDisabled}>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Box
                  alignItems="center"
                  bg={
                    !isDisabled && isPressed
                      ? 'primary.100'
                      : isHovered
                      ? 'primary.50'
                      : Colors.white
                  }
                  borderColor={Colors.borderColor}
                  borderWidth="1px"
                  borderRadius="15px"
                  width="200px"
                  height="55px"
                  justifyContent="center"
                  style={{
                    transform: [
                      {
                        scale: !isDisabled && isPressed ? 0.96 : 1,
                      },
                    ],
                  }}>
                  <Text color={isDisabled ? Colors.borderColor : Colors.black} fontSize="25px">
                    {buttonTitle}
                  </Text>
                </Box>
              );
            }}
          </Pressable>
        </Box>
      </Box>
    </>
  );
};
AppBottom.propTypes = {
  buttonTitle: PropTypes.string,
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func,
  isRight: PropTypes.bool,
};
AppBottom.defaultProps = {
  buttonTitle: '',
  isDisabled: false,
  isRight: false,
  onPress: () => {},
};
export default React.memo(AppBottom);
