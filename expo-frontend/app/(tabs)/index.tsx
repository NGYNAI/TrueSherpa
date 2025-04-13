// app/(tabs)/index.tsx
import { Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";

const TEST_QUERY = gql`
  query {
    hello
  }
`
export default function HomeScreen() {
  const  { loading, error, data } = useQuery(TEST_QUERY);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data) return <Text>No data</Text>; 
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{data.hello}</Text>
    </View>
  );
}
