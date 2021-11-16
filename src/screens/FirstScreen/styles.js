import { StyleSheet } from 'react-native';
import { Colors } from '@theme';
import { wp, hp, adjustFontSize } from '@src/common/responsive';

export const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
  },
  contentView: {
    backgroundColor: Colors.grey,
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
  },
  listContainer: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 5,
  },

  listFooter: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#FFFFFF',
    height: 30,
  },
  itemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 3,
    paddingVertical: 10,
  },
});
