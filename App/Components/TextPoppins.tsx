import { StyleSheet, Text, TextProps } from "react-native"

export default function TextPoppins({ children, style, ...rest }: TextProps) {
  const fontFamily = "Poppins" + (StyleSheet.flatten(style)?.fontWeight || 500)

  return (
    <Text style={[style, { fontFamily }]} selectable={false} {...rest}>
      {children}
    </Text>
  )
}
