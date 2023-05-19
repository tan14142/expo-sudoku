import { StyleSheet, Text, View } from "react-native"

export default function () {
  return (
    <View style={styles.container}>
      <Text selectable={false} style={styles.text}>
        SU
      </Text>
      <Text selectable={false} style={styles.text}>
        DO
      </Text>
      <Text selectable={false} style={styles.text}>
        KU
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 48,
    fontWeight: "bold",
  },
})

// TODO: animate the text to slide in from the left, right and bottom
