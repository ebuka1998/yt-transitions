import {Dimensions} from "react-native";

export const {height, width} = Dimensions.get("window");

export const dragRange = 50;

export const heightRange = 80;

export const minHeight = 64;

export const midBound = height - 64 * 3;

export const upperBound = midBound + minHeight;

export const dragDownVal = Dimensions.get("window").height - 70;
