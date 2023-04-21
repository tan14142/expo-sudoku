import { ScrollView, Switch, StyleSheet, Text, View } from "react-native"
import { useAppDispatch, useAppSelector } from "~/Store"
import {
  toggleDisplaySolver,
  toggleDisplayTimer,
  toggleHighlightCurrentTrack,
  toggleHighlightIdenticalNumbers,
  toggleHighlightMistakenInput,
  toggleLowlightInvalidInput,
  toggleLowlightSolvedNumbers,
  toggleRemoveNotesAutomatically,
  toggleScreenAlwaysOn,
} from "~/Store/Settings"

export default function Settings() {
  const {
    displaySolver,
    displayTimer,
    highlightCurrentTrack,
    highlightIdenticalNumbers,
    highlightMistakenInput,
    lowlightInvalidInput,
    lowlightSolvedNumbers,
    removeNotesAutomatically,
    screenAlwaysOn,
  } = useAppSelector(state => state.settings)
  const dispatch = useAppDispatch()

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Game</Text>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Display solver</Text>
          <Text style={styles.description}>Lorem Ipsum</Text>
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
          <Text style={styles.label}>Display Timer</Text>
          <Text style={styles.description}>Lorem Ipsum</Text>
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
          <Text style={styles.label}>Highlight current track</Text>
          <Text style={styles.description}>row and column</Text>
        </View>
        <Switch
          value={highlightCurrentTrack}
          onValueChange={() => {
            dispatch(toggleHighlightCurrentTrack())
          }}
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Highlight identical numbers</Text>
          <Text style={styles.description}>Lorem Ipsum</Text>
        </View>
        <Switch
          value={highlightIdenticalNumbers}
          onValueChange={() => {
            dispatch(toggleHighlightIdenticalNumbers())
          }}
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Highlight mistaken input</Text>
          <Text style={styles.description}>
            Generated to be unique solution, ...
          </Text>
        </View>
        <Switch
          value={highlightMistakenInput}
          onValueChange={() => {
            dispatch(toggleHighlightMistakenInput())
          }}
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Lowlight invalid input</Text>
          <Text style={styles.description}>prevent</Text>
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
          <Text style={styles.label}>Lowlight solved numbers</Text>
          <Text style={styles.description}>Lorem Ipsum</Text>
        </View>
        <Switch
          value={lowlightSolvedNumbers}
          onValueChange={() => {
            dispatch(toggleLowlightSolvedNumbers())
          }}
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Remove Notes Automatically</Text>
          <Text style={styles.description}>Lorem Ipsum</Text>
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
          <Text style={styles.label}>Screen Always On</Text>
          <Text style={styles.description}>Lorem Ipsum</Text>
        </View>
        <Switch
          value={screenAlwaysOn}
          onValueChange={() => {
            dispatch(toggleScreenAlwaysOn())
          }}
        />
      </View>
      <Text style={styles.header}>More</Text>
      <Text onPress={() => console.log(123)} style={styles.label}>
        About
      </Text>
      <Text onPress={() => console.log(123)} style={styles.label}>
        Privacy Policy
      </Text>
      <Text onPress={() => console.log(123)} style={styles.label}>
        Terms of Service
      </Text>
      <Text onPress={() => console.log(123)} style={styles.label}>
        Contact Us
      </Text>
      <Text onPress={() => console.log(123)} style={styles.label}>
        Reset All
      </Text>
      <Text onPress={() => console.log(123)} style={styles.label}>
        How to Play
      </Text>
      <Text onPress={() => console.log(123)} style={styles.label}>
        Rate App
      </Text>
      <Text onPress={() => console.log(123)} style={styles.label}>
        Share App
      </Text>
      <Text>Version</Text>
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
