import { Platform, StyleSheet } from "react-native"

export default StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  dropShadow: {
    elevation: 8,
    shadowColor: Platform.OS === "android" ? "black" : "grey",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
  },
  headerButton: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    width: 24,
  },
})
