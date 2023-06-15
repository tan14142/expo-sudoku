import { Platform, StyleSheet } from "react-native"

export default StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  dropShadow: {
    elevation: 4,
    shadowColor: Platform.OS === "android" ? "black" : "grey",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
  },
  headerButton: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    width: 24,
  },
  padding: {
    padding: 12,
  },
  pressableRound: {
    borderRadius: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 4,
    width: "100%",
  },
})
