import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import { setCell } from "~/Store/Board"

export default function NumberPad() {
  const dispatch = useAppDispatch()
  const whitelist = useAppSelector(state => state.board.selection.whitelist)

  function handlePress(value: number) {
    dispatch(setCell(value))
  }

  return (
    <>
      <View style={styles.row1}>
        {Array(5)
          .fill(true)
          .map((_, i) => (
            <Pressable
              key={i}
              style={[styles.button, !whitelist[i + 1] && styles.faded]}
              onPress={() => handlePress(i + 1)}>
              <Text selectable={false} style={styles.text}>
                {i + 1}
              </Text>
            </Pressable>
          ))}
      </View>
      <View style={styles.row2}>
        {Array(4)
          .fill(true)
          .map((_, i) => (
            <Pressable
              key={i}
              style={[styles.button, !whitelist[i + 6] && styles.faded]}
              onPress={() => handlePress(i + 6)}>
              <Text selectable={false} style={styles.text}>
                {i + 6}
              </Text>
            </Pressable>
          ))}
      </View>
    </>
  )
}

const width = Dimensions.get("window").width * 0.1

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#307DF6",
    borderRadius: width / 4,
    height: width,
    width,

    // drop shadow
    elevation: 16,
    shadowColor: "#D7E1F4",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
  },
  faded: {
    opacity: 0.5,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: width / 2,
    marginHorizontal: width / 4,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: width * 0.75,
  },
  text: {
    color: "white",
  },
})
