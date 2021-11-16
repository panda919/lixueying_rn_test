import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';

export const features = (state) => state.features;
export const featuresSelector = createSelector(features, (data) => data.features);
export const activeFeatureIdsSelector = createSelector(features, (data) => data.activeFeatures);
export const activeFeaturesSelector = createSelector(
  featuresSelector,
  activeFeatureIdsSelector,
  (featureList, activeFeatureIds) =>
    _.map(activeFeatureIds, (id) => _.findLast(featureList, (feature) => feature?.id === id)),
);
