import { ScrollView, StyleSheet, Switch, View } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import { AnyAction } from "redux"
import { useAppDispatch, useAppSelector } from "~/Store"
import {
  setHints,
  setMistakes,
  toggleDisplayAnimations,
  toggleDisplayHinter,
  toggleDisplayMistakes,
  toggleDisplaySolver,
  toggleDisplayTimer,
  toggleHighlightLinkedCells,
  toggleHighlightMatchingNumbers,
  toggleHighlightMistake,
  toggleLowlightInvalidInput,
  toggleLowlightSolvedNumbers,
  toggleRemoveNotesAutomatically,
  toggleScreenAlwaysOn,
  toggleVibration,
} from "~/Store/Settings"
import NumberInput from "~/Components/NumberInput"
import TextPoppins from "~/Components/TextPoppins"
import useSound from "~/Hooks/useSound"
import { useEffect } from "react"

export default function Settings() {
  const isFocused = useIsFocused()
  const dispatch = useAppDispatch()
  const {
    displayAnimations,
    displayHinter,
    hints,
    displayMistakes,
    mistakes,
    displaySolver,
    displayTimer,
    highlightLinkedCells,
    highlightMatchingCells,
    highlightMistake,
    lowlightInvalidInput,
    lowlightSolvedNumbers,
    removeNotesAutomatically,
    screenAlwaysOn,
    vibration,
  } = useAppSelector(state => state.settings)
  const playSound = useSound()

  function handleClick(state: boolean, toggler: () => AnyAction) {
    playSound(state ? "tick" : "tock")
    dispatch(toggler())
  }

  useEffect(() => {
    if (isFocused) {
      playSound("navigate")
    }
  }, [isFocused])

  return (
    <ScrollView style={styles.container}>
      <TextPoppins style={styles.header}>Game</TextPoppins>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Display animations</TextPoppins>
          <TextPoppins style={styles.description}>Display animations on the board</TextPoppins>
        </View>
        <Switch
          value={displayAnimations}
          onValueChange={() => handleClick(displayAnimations, toggleDisplayAnimations)}
        />
      </View>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Display hinter</TextPoppins>
          <TextPoppins style={styles.description}>Display the hint button</TextPoppins>
        </View>
        <Switch
          value={displayHinter}
          onValueChange={() => handleClick(displayHinter, toggleDisplayHinter)}
        />
      </View>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Limit hints</TextPoppins>
          <TextPoppins style={styles.description}>Limit the number of hints per game</TextPoppins>
        </View>
        <NumberInput
          disabled={!displayHinter}
          value={hints}
          decrement={() => hints && dispatch(setHints(hints - 1))}
          increment={() => hints < 3 && dispatch(setHints(hints + 1))}
        />
      </View>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Display mistakes</TextPoppins>
          <TextPoppins style={styles.description}>
            Display the number of mistakes per game
          </TextPoppins>
        </View>
        <Switch
          value={displayMistakes}
          onValueChange={() => handleClick(displayMistakes, toggleDisplayMistakes)}
        />
      </View>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Limit hints</TextPoppins>
          <TextPoppins style={styles.description}>Limit the number of hints per game</TextPoppins>
        </View>
        <NumberInput
          disabled={!displayMistakes}
          value={mistakes}
          decrement={() => mistakes && dispatch(setMistakes(mistakes - 1))}
          increment={() => mistakes < 3 && dispatch(setMistakes(mistakes + 1))}
        />
      </View>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Display solver</TextPoppins>
          <TextPoppins style={styles.description}>Display the solve button</TextPoppins>
        </View>
        <Switch
          value={displaySolver}
          onValueChange={() => handleClick(displaySolver, toggleDisplaySolver)}
        />
      </View>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Display timer</TextPoppins>
          <TextPoppins style={styles.description}>
            Display the pause button and elapsed time
          </TextPoppins>
        </View>
        <Switch
          value={displayTimer}
          onValueChange={() => handleClick(displayTimer, toggleDisplayTimer)}
        />
      </View>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Screen always on</TextPoppins>
          <TextPoppins style={styles.description}>Keep the screen always on</TextPoppins>
        </View>
        <Switch
          value={screenAlwaysOn}
          onValueChange={() => handleClick(screenAlwaysOn, toggleScreenAlwaysOn)}
        />
      </View>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Vibration</TextPoppins>
          <TextPoppins style={styles.description}>Vibrate on mistake</TextPoppins>
        </View>
        <Switch value={vibration} onValueChange={() => handleClick(vibration, toggleVibration)} />
      </View>
      <TextPoppins style={styles.header}>Board</TextPoppins>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Highlight linked cells</TextPoppins>
          <TextPoppins style={styles.description}>
            Highlight all cells in the same column, row and region
          </TextPoppins>
        </View>
        <Switch
          value={highlightLinkedCells}
          onValueChange={() => handleClick(highlightLinkedCells, toggleHighlightLinkedCells)}
        />
      </View>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Highlight matching numbers</TextPoppins>
          <TextPoppins style={styles.description}>
            Highlight matching numbers in the other regions
          </TextPoppins>
        </View>
        <Switch
          value={highlightMatchingCells}
          onValueChange={() => handleClick(highlightMatchingCells, toggleHighlightMatchingNumbers)}
        />
      </View>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Highlight mistakes</TextPoppins>
          <TextPoppins style={styles.description}>Highlight mistakes immediately</TextPoppins>
        </View>
        <Switch
          value={highlightMistake}
          onValueChange={() => handleClick(highlightMistake, toggleHighlightMistake)}
        />
      </View>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Lowlight invalid number inputs</TextPoppins>
          <TextPoppins style={styles.description}>
            Fade out input if there is a match in linked cells
          </TextPoppins>
        </View>
        <Switch
          value={lowlightInvalidInput}
          onValueChange={() => handleClick(lowlightInvalidInput, toggleLowlightInvalidInput)}
        />
      </View>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Lowlight solved numbers</TextPoppins>
          <TextPoppins style={styles.description}>
            Fade out input if the number is solved
          </TextPoppins>
        </View>
        <Switch
          disabled={lowlightInvalidInput}
          value={lowlightInvalidInput || lowlightSolvedNumbers}
          onValueChange={() => handleClick(lowlightSolvedNumbers, toggleLowlightSolvedNumbers)}
        />
      </View>
      <View style={styles.row}>
        <View>
          <TextPoppins style={styles.label}>Remove notes automatically</TextPoppins>
          <TextPoppins style={styles.description}>
            Remove notes from linked cells on number input
          </TextPoppins>
        </View>
        <Switch
          value={removeNotesAutomatically}
          onValueChange={() =>
            handleClick(removeNotesAutomatically, toggleRemoveNotesAutomatically)
          }
        />
      </View>
      <TextPoppins style={styles.header}>More</TextPoppins>
      <TextPoppins onPress={() => console.log(123)} style={styles.label}>
        About
      </TextPoppins>
      <TextPoppins onPress={() => console.log(123)} style={styles.label}>
        Privacy Policy
      </TextPoppins>
      <TextPoppins onPress={() => console.log(123)} style={styles.label}>
        Terms of Service
      </TextPoppins>
      <TextPoppins onPress={() => console.log(123)} style={styles.label}>
        Contact Us
      </TextPoppins>
      <TextPoppins onPress={() => console.log(123)} style={styles.label}>
        Reset All
      </TextPoppins>
      <TextPoppins onPress={() => console.log(123)} style={styles.label}>
        How to Play
      </TextPoppins>
      <TextPoppins onPress={() => console.log(123)} style={styles.label}>
        Rate App
      </TextPoppins>
      <TextPoppins onPress={() => console.log(123)} style={styles.label}>
        Share App
      </TextPoppins>
      <TextPoppins>Version</TextPoppins>
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
    fontWeight: "700",
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
