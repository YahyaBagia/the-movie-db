import { View, StyleSheet } from "react-native";
import { Card, Divider, List, Text } from "react-native-paper";

import Spacer from "@/src/components/Spacer";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import useProfileController from "@/src/controllers/main/ProfileController";

import ProfileAvatar from "./components/ProfileAvatar";

const ProfileScreen: React.FC = () => {
  const { account_details, onPressLogout } = useProfileController();

  return (
    <ScreenWrapper>
      {account_details ? (
        <View style={styles.container}>
          <Card style={styles.card}>
            <View style={styles.profileContainer}>
              <ProfileAvatar account_details={account_details} />
              <Spacer />
              <Text variant="titleLarge">{account_details.name}</Text>
              <Spacer />
              <Text variant="titleMedium">{account_details.username}</Text>
              <Spacer />
            </View>
            <Divider />
            <List.Item
              left={() => <List.Icon icon="logout" style={styles.iconLeft} />}
              right={() => <List.Icon icon="arrow-right" />}
              title="Logout"
              onPress={onPressLogout}
              style={styles.listItem}
            />
          </Card>
        </View>
      ) : (
        <Text variant="labelMedium" style={styles.versionText}>
          No account details available
        </Text>
      )}
      <Text variant="labelMedium" style={styles.versionText}>
        Version 1.0.0
      </Text>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  card: {
    paddingBottom: 8,
  },
  profileContainer: {
    alignItems: "center",
  },
  iconLeft: {
    marginLeft: 12,
  },
  listItem: {
    paddingHorizontal: 12,
  },
  versionText: {
    textAlign: "center",
    marginBottom: 8,
  },
});

export default ProfileScreen;
