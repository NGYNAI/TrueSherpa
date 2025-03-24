import { View, StyleSheet } from "react-native"
import { Text } from "react-native-elements"
import { REDIRECT_URI } from "../../context/auth/AuthContext"

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text h3>Home</Text>
      <Text style={styles.subtitle}>{REDIRECT_URI}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "gray",
  },
  button: {
    backgroundColor: "#007AFF",
    width: 200,
  },
})
