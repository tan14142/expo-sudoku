import { useState } from "react"
import { Animated, Modal, Pressable, Text, View } from "react-native"
import { Octicons } from "@expo/vector-icons"
import { buttonStyle } from "./Header"
import animate from "~/Animations"

export default function ExportButton() {
  const [opacity, timing, reverse] = animate(250, [1, 0])
  const [modal, setModal] = useState(false)

  function handlePress() {
    if (!modal) {
      timing.start(() => setModal(true))
    }
  }

  function handlePressShareInit() {
    setModal(false)
    reverse.start()
  }

  function handlePressShareState() {
    setModal(false)
    reverse.start()
  }

  return (
    <Pressable onPress={handlePress} style={buttonStyle}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false)
          reverse.start()
        }}>
        <View>
          <View>
            <Pressable onPress={handlePressShareInit}>
              <Text>Share Init</Text>
            </Pressable>
            <Pressable onPress={handlePressShareState}>
              <Text>Share State</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Animated.View style={{ opacity }}>
        <Octicons name="share" size={24} />
      </Animated.View>
    </Pressable>
  )
}
