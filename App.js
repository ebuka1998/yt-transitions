import {StatusBar} from "expo-status-bar";
import {StyleSheet, Text, View} from "react-native";
import HomeScreen from "./screens/HomeScreen";
import {PlayerContextProvider} from "./context/playerContext";
import VideoModal from "./components/VideoModal";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Main from "./navigations/Main";
import {DataContextProvider} from "./context/dataContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <DataContextProvider>
        <PlayerContextProvider>
          <Main />
          <StatusBar style="auto" />
        </PlayerContextProvider>
      </DataContextProvider>
    </GestureHandlerRootView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
