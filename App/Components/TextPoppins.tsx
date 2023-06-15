import { StyleSheet, Text, TextProps } from "react-native"

export default function TextPoppins({ children, style, ...rest }: TextProps) {
  style = StyleSheet.flatten(style) || {}

  if (style?.fontWeight) {
    style.fontFamily = "Poppins" + style.fontWeight
    style.fontWeight = undefined
  } else {
    style.fontFamily = "Poppins500"
  }

  return (
    <Text style={style} selectable={false} {...rest}>
      {children}
    </Text>
  )
}
