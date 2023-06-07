import { ReactNode } from "react"
import { Pressable, StyleSheet } from "react-native"
import styles from "~/Styles"

interface OverlayProps {
  children: ReactNode
  setVisible: (visible: boolean) => void
}

export default function Overlay({ children, setVisible }: OverlayProps) {
  return (
    <Pressable onPress={() => setVisible(false)} style={[style.container, styles.center]}>
      {children}
    </Pressable>
  )
}

const style = StyleSheet.create({
  container: { backgroundColor: "rgba(0,0,0,0.5)", flex: 1 },
})
