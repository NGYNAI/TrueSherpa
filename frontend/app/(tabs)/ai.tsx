import { View, StyleSheet } from "react-native"
import { Text } from "react-native-elements"

export default function AiScreen() {
  return (
    <View style={styles.container}>
      <Text h3>AI Features Coming Soon</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
