import { StyleSheet } from "react-native";
import { Card, Divider, Text } from "react-native-paper";

import Utils from "@/src/common/Utils";
import { IReview } from "@/src/apis/reviews/interfaces";

export interface IReviewListItemProps {
  review: IReview;
}

const ReviewListItem: React.FC<IReviewListItemProps> = ({ review }) => {
  const { author, content, created_at } = review;
  return (
    <Card style={styles.card}>
      <Text variant="titleLarge" style={styles.author}>
        {author}
        <Text variant="bodySmall" style={styles.date}>
          {" "}
          ({Utils.formatDate(created_at)})
        </Text>
      </Text>
      <Divider style={styles.divider} />
      <Text variant="bodyLarge">{content}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 4,
    padding: 8,
  },
  author: {
    fontWeight: "bold",
  },
  date: {
    fontStyle: "italic",
  },
  divider: {
    marginVertical: 8,
  },
});

export default ReviewListItem;
