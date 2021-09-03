import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import colors from '../constants/colors';

const NavBar = (props) => {
  const { tabs, setSelectedTab } = props;
  const renderTabs = tabs.map((tab) => (
    <TouchableOpacity
      key={tab.id}
      onPress={() => setSelectedTab(tab)}
      style={styles.buttonContainer}
    >
      <Icon name={tab.icon} size={20} color="black" />
      <Text style={styles.buttonText}>
        {tab.title}
      </Text>
    </TouchableOpacity>
  ));
  return (
    <ScrollView
      style={styles.navBarContainer}
      horizontal
      alwaysBounceHorizontal
      centerContent
    >
      {renderTabs}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  navBarContainer: {
    flex: 1,
    height: 1000,
    backgroundColor: colors.tabBackground,
    maxHeight: Dimensions.get('window').height * 0.12,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'nunito-bold',
  },
});

export default NavBar;
