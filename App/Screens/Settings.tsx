import { ScrollView, Switch, StyleSheet, Text, View } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import {
  toggleDisplaySolver,
  toggleDisplayTimer,
  toggleHighlightLinkedCells,
  toggleHighlightMatchingNumbers,
  toggleHighlightMistake,
  toggleLowlightInvalidInput,
  toggleLowlightSolvedNumbers,
  toggleRemoveNotesAutomatically,
  toggleScreenAlwaysOn,
} from "~/Store/Settings"

export default function Settings() {
  const dispatch = useAppDispatch()
  const {
    displaySolver,
    displayTimer,
    highlightLinkedCells,
    highlightMatchingCells,
    highlightMistake,
    lowlightInvalidInput,
    lowlightSolvedNumbers,
    removeNotesAutomatically,
    screenAlwaysOn,
  } = useAppSelector(state => state.settings)

  return (
    <ScrollView style={styles.container}>
      <Text selectable={false} style={styles.header}>
        Game
      </Text>
      <View style={styles.row}>
        <View>
          <Text selectable={false} style={styles.label}>
            Display solver
          </Text>
          <Text selectable={false} style={styles.description}>
            Display the solve button
          </Text>
        </View>
        <Switch
          value={displaySolver}
          onValueChange={() => {
            dispatch(toggleDisplaySolver())
          }}
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text selectable={false} style={styles.label}>
            Display Timer
          </Text>
          <Text selectable={false} style={styles.description}>
            Display the pause button and elapsed time
          </Text>
        </View>
        <Switch
          value={displayTimer}
          onValueChange={() => {
            dispatch(toggleDisplayTimer())
          }}
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text selectable={false} style={styles.label}>
            Highlight linked cells
          </Text>
          <Text selectable={false} style={styles.description}>
            Highlight all cells in the same column, row and region
          </Text>
        </View>
        <Switch
          value={highlightLinkedCells}
          onValueChange={() => {
            dispatch(toggleHighlightLinkedCells())
          }}
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text selectable={false} style={styles.label}>
            Highlight matching numbers
          </Text>
          <Text selectable={false} style={styles.description}>
            Highlight matching numbers in the other regions
          </Text>
        </View>
        <Switch
          value={highlightMatchingCells}
          onValueChange={() => {
            dispatch(toggleHighlightMatchingNumbers())
          }}
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text selectable={false} style={styles.label}>
            Highlight mistakes
          </Text>
          <Text selectable={false} style={styles.description}>
            Highlight mistakes immediately
          </Text>
        </View>
        <Switch
          value={highlightMistake}
          onValueChange={() => {
            dispatch(toggleHighlightMistake())
          }}
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text selectable={false} style={styles.label}>
            Lowlight invalid number inputs
          </Text>
          <Text selectable={false} style={styles.description}>
            Fade out input if there is a match in linked cells
          </Text>
        </View>
        <Switch
          value={lowlightInvalidInput}
          onValueChange={() => {
            dispatch(toggleLowlightInvalidInput())
          }}
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text selectable={false} style={styles.label}>
            Lowlight solved numbers
          </Text>
          <Text selectable={false} style={styles.description}>
            Fade out input if the number is solved
          </Text>
        </View>
        <Switch
          disabled={lowlightInvalidInput}
          value={lowlightInvalidInput || lowlightSolvedNumbers}
          onValueChange={() => {
            dispatch(toggleLowlightSolvedNumbers())
          }}
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text selectable={false} style={styles.label}>
            Remove notes automatically
          </Text>
          <Text selectable={false} style={styles.description}>
            Remove notes from linked cells on number input
          </Text>
        </View>
        <Switch
          value={removeNotesAutomatically}
          onValueChange={() => {
            dispatch(toggleRemoveNotesAutomatically())
          }}
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text selectable={false} style={styles.label}>
            Screen always on
          </Text>
          <Text selectable={false} style={styles.description}>
            Keep the screen always on
          </Text>
        </View>
        <Switch
          value={screenAlwaysOn}
          onValueChange={() => {
            dispatch(toggleScreenAlwaysOn())
          }}
        />
      </View>
      <Text selectable={false} style={styles.header}>
        More
      </Text>
      <Text onPress={() => console.log(123)} selectable={false} style={styles.label}>
        About
      </Text>
      <Text onPress={() => console.log(123)} selectable={false} style={styles.label}>
        Privacy Policy
      </Text>
      <Text onPress={() => console.log(123)} selectable={false} style={styles.label}>
        Terms of Service
      </Text>
      <Text onPress={() => console.log(123)} selectable={false} style={styles.label}>
        Contact Us
      </Text>
      <Text onPress={() => console.log(123)} selectable={false} style={styles.label}>
        Reset All
      </Text>
      <Text onPress={() => console.log(123)} selectable={false} style={styles.label}>
        How to Play
      </Text>
      <Text onPress={() => console.log(123)} selectable={false} style={styles.label}>
        Rate App
      </Text>
      <Text onPress={() => console.log(123)} selectable={false} style={styles.label}>
        Share App
      </Text>
      <Text selectable={false}>Version</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    lineHeight: 32,
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    color: "gray",
  },
})

// TODO: Make more settings look like blocks with padding
