import { createSlice, createAction } from '@reduxjs/toolkit';
import Reactotron from 'reactotron-react-native';
import _ from 'lodash';

const initState = {
  features: [],
  activeFeatures: [],
};
const featuresSlice = createSlice({
  name: 'features',
  initialState: initState,
  reducers: {
    setFeatures(state, action) {
      const { payload: features } = action;
      state.features = features;
      if (__DEV__) {
        Reactotron.display({
          name: 'Action',
          value: {
            ...action,
            newState: state,
          },
          preview: action.type,
          important: true,
        });
      }
    },
    setActiveFeatures(state, action) {
      const { payload: activeFeatures } = action;
      state.activeFeatures = activeFeatures;
      if (__DEV__) {
        Reactotron.display({
          name: 'Action',
          value: {
            ...action,
            newState: state,
          },
          preview: action.type,
          important: true,
        });
      }
    },
    resetFeatures(state, action) {
      state.features = [];
      state.activeFeatures = [];
    },
    resetActiveFeatures(state, action) {
      state.activeFeatures = [];
    },
  },
});
export const reset = createAction('RESET');
export const { setFeatures, resetFeatures, setActiveFeatures, resetActiveFeatures } =
  featuresSlice.actions;
export default featuresSlice.reducer;
