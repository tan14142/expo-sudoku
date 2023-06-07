import { MaterialCommunityIcons } from "@expo/vector-icons"

export type LogoIconProps = React.ComponentProps<typeof MaterialCommunityIcons>

export default function LogoIcon(props: LogoIconProps) {
  return <MaterialCommunityIcons {...props} />
}
