import React from 'react';
import { Platform, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { useHeaderHeight } from '@react-navigation/stack';

import { ScrollView } from 'react-native-gesture-handler';
import { Box } from 'native-base';

function DismissKeyboardView({ scrollable, children, ...props }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'android' ? 'padding' : 'height'}
      keyboardVerticalOffset={useHeaderHeight()}
      style={{ flex: 1 }}
      {...props}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {props?.scrollable ? (
          <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
            <Box>{props?.children}</Box>
          </ScrollView>
        ) : (
          <Box flex={1}>{props.children}</Box>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default DismissKeyboardView;
