import { useState } from "react"
import { Animated, Modal, Platform, Pressable, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { GlythType } from "~/Components/Logo"
import animate from "~/Animations"
import styles from "~/Styles"
import TextPoppins from "~/Components/TextPoppins"

export default function ExportButton() {
  const [opacity, timing, reverse] = animate(250, [1, 0])
  const [modal, setModal] = useState(false)
  const icon = ((Platform.OS === "ios" ? "export" : "share") + "-variant") as GlythType

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
    <Pressable onPress={handlePress} style={styles.headerButton}>
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
              <TextPoppins>Share Init</TextPoppins>
            </Pressable>
            <Pressable onPress={handlePressShareState}>
              <TextPoppins>Share State</TextPoppins>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Animated.View style={{ opacity }}>
        <MaterialCommunityIcons color="white" name={icon} size={24} />
      </Animated.View>
    </Pressable>
  )
}
