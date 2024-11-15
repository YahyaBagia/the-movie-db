import { Card, Divider, Text } from "react-native-paper";

import Utils from "@/src/common/Utils";
import { IReview } from "@/src/apis/reviews/interfaces";

export interface IReviewListItemProps {
  review: IReview;
}

const ReviewListItem: React.FC<IReviewListItemProps> = (props) => {
  const { review } = props;
  const { author, content, created_at } = review;
  return (
    <Card style={{ margin: 4, padding: 8 }}>
      <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
        {author}
        <Text variant="bodySmall"> ({Utils.formatDate(created_at)})</Text>
      </Text>
      <Divider style={{ marginVertical: 8 }} />
      <Text variant="bodyLarge">{content}</Text>
    </Card>
  );
};

export default ReviewListItem;
