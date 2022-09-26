import {View, Text, StyleSheet, StatusBar} from "react-native";
import React from "react";
import {width} from "../constants/constant";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={{paddingLeft: 20, fontSize: 20}}>HomeHeader</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: 50,
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
    flexDirection: 'column'
  },
});
export default HomeHeader;
