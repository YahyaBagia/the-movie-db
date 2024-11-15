import { StyleSheet, View } from "react-native";
import { Chip, Text } from "react-native-paper";

import { IKeywordsResponse } from "@/src/apis/movie/interfaces";

export interface IKeywordsProps {
  keywords_data: IKeywordsResponse;
}

const Keywords: React.FC<IKeywordsProps> = ({ keywords_data }) => {
  const { keywords } = keywords_data;
  return (
    <View style={styles.contentContainer}>
      <Text variant="titleLarge">Keywords</Text>
      <View style={styles.chipContainer}>
        {keywords.map(({ name }) => (
          <Chip key={name} style={styles.chip}>
            {name}
          </Chip>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
});

export default Keywords;
