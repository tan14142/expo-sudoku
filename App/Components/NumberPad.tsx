import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import { useAppDispatch } from "~/Store"
import { setCell } from "~/Store/Board"

export default function NumberPad() {
  const dispatch = useAppDispatch()

  function handlePress(value: number) {
    dispatch(setCell(value))
  }

  return (
    <>
      <View style={styles.row1}>
        <Pressable style={styles.button} onPress={() => handlePress(1)}>
          <Text selectable={false} style={styles.text}>
            1
          </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress(2)}>
          <Text selectable={false} style={styles.text}>
            2
          </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress(3)}>
          <Text selectable={false} style={styles.text}>
            3
          </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress(4)}>
          <Text selectable={false} style={styles.text}>
            4
          </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress(5)}>
          <Text selectable={false} style={styles.text}>
            5
          </Text>
        </Pressable>
      </View>
      <View style={styles.row2}>
        <Pressable style={styles.button} onPress={() => handlePress(6)}>
          <Text selectable={false} style={styles.text}>
            6
          </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress(7)}>
          <Text selectable={false} style={styles.text}>
            7
          </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress(8)}>
          <Text selectable={false} style={styles.text}>
            8
          </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePress(9)}>
          <Text selectable={false} style={styles.text}>
            9
          </Text>
        </Pressable>
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
