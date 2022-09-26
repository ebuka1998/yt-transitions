import {View, Text, TouchableOpacity} from "react-native";
import React, {useContext} from "react";
import HomeScreen from "../screens/HomeScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import ChannelsScreen from "../screens/ChannelsScreen";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {dragDownVal, height} from "../constants/constant";
import {PlayerContext} from "../context/playerContext";
import Settings from "../screens/Settings";
import VideoModal from "../components/VideoModal";
import HocScreen from "../screens/HocScreen";

const BottomTab = () => {
  const {translateY, showHeight, selectedVideo} = useContext(PlayerContext);
  const Tab = createBottomTabNavigator();

  const tabOpacity = useAnimatedStyle(() => {
    return {
      height:
        showHeight.value === 0
          ? 60
          : interpolate(
              translateY.value,
              [1, dragDownVal],
              [0, 60],
              Extrapolate.CLAMP
            ),
    };
  });

  const TabIcon = ({color, size = 24, isFocused, index}) => {
    let icon;
    if(index === 0 && isFocused) {
      icon = "home"
    } else if (index === 0 && !isFocused) {
      icon = "home-outline"
    } else if(index === 1 && isFocused) {
      icon = 'compass'
    } else if (index === 1 && !isFocused) {
      icon = 'compass-outline'
    } else if (index === 2 && isFocused) {
      icon = 'md-information-circle'
    } else{
      icon = 'md-information-circle-outline'
    }
   

    // const icon =
    //   index === 0 && isFocused ? "home" : index === 1 ? "body-outline" : "book-sharp";
    return (
      <View>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    );
  };

  const MyTabBar = ({state, descriptors, navigation}) => {
    return (
      <>
        <View>{selectedVideo && <VideoModal />}</View>
        <Animated.View
          style={[
            {
              // height: 60,
              backgroundColor: "white",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              zIndex: 30,
            },
            tabOpacity,
          ]}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const {options} = descriptors[route.key];
            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const color = isFocused ? "red" : "black";

            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                testID={options.tabBarTestID}
                accessibilityRole="button"
              >
                <TabIcon
                  index={index}
                  isFocused={isFocused}
                  color={color}
                  size={24}
                />
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </>
    );
  };

  return (
    <>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Channels"
          component={ChannelsScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTab;
