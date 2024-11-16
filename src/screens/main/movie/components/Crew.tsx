import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { ICrew } from "@/src/apis/movie/interfaces";

export interface ICrewProps {
  crew: ICrew[];
}

const Crew: React.FC<ICrewProps> = ({ crew }) => {
  return (
    <View style={styles.contentContainer}>
      <Text variant="titleLarge">Crew</Text>
      <View>
        {crew.map((item) => (
          <CrewItem key={item.id ?? item.name} crew={item} />
        ))}
      </View>
    </View>
  );
};

export interface ICrewItemProps {
  crew: ICrew;
}

const CrewItem: React.FC<ICrewItemProps> = ({ crew }) => {
  return (
    <View style={styles.itemContainer}>
      <Text variant="titleMedium">
        • {crew.name} <Text variant="bodySmall">({crew.job})</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
  },
  itemContainer: {
    marginVertical: 4, // Adds spacing between crew items
  },
});

export default Crew;
