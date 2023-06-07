import { Pressable, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAppDispatch } from "~/Store"
import { setBoard, reset } from "~/Store/Game"
import generate from "~/Utils/generate"

export default function Trials() {
  const dispatch = useAppDispatch()
  const navigate = useNavigation().navigate

  async function handlePress(clues: number, difficulty: string) {
    dispatch(
      setBoard({
        difficulty,
        ...(await generate(clues, new Date().toISOString().slice(0, 10))),
      }),
    )
    dispatch(reset())
    navigate("Game")
  }

  return (
    <Pressable onPress={() => handlePress(25, "Today's Puzzle")}>
      <Text>Today's Puzzle</Text>
    </Pressable>
  )
}
