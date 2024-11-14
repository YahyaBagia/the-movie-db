import { View } from "react-native";
import { Avatar, Button, Card, List } from "react-native-paper";

import Utils from "@/src/common/Utils";

import ScreenWrapper from "@/src/components/ScreenWrapper";

import useProfileController from "@/src/controllers/main/ProfileController";

const ProfileScreen = () => {
  const { account_details, onPressLogout } = useProfileController();
  return (
    <ScreenWrapper>
      {!!account_details && (
        <View style={{ flex: 1, padding: 8 }}>
          <Card>
            <Card.Content>
              <List.Item
                title={account_details.name}
                description={account_details.username}
                left={(props) => {
                  if (!account_details.avatar.tmdb.avatar_path) {
                    return (
                      <Avatar.Image
                        {...props}
                        source={{
                          uri: `https://image.tmdb.org/t/p/w185/${account_details.avatar.tmdb.avatar_path}`,
                        }}
                        size={44}
                      />
                    );
                  } else if (!!account_details.name) {
                    return (
                      <Avatar.Text
                        label={Utils.generateNameInitials(account_details.name)}
                        size={44}
                      />
                    );
                  } else {
                    return <Avatar.Icon icon={"account"} size={44} />;
                  }
                }}
              />
            </Card.Content>
          </Card>
        </View>
      )}
      <Button onPress={onPressLogout}>Logout</Button>
    </ScreenWrapper>
  );
};

export default ProfileScreen;
