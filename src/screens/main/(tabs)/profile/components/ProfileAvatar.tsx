import { Avatar } from "react-native-paper";

import Utils from "@/src/common/Utils";
import { PROFILE_IMAGE_BASE_URL } from "@/src/common/Constants";
import { IAccountDetails } from "@/src/apis/account/interfaces";

interface IProfileAvatarProps {
  account_details: IAccountDetails;
}

const AVATAR_SIZE = 150 as const;

const ProfileAvatar: React.FC<IProfileAvatarProps> = ({ account_details }) => {
  if (!!account_details.avatar.tmdb.avatar_path) {
    return (
      <Avatar.Image
        source={{
          uri: `${PROFILE_IMAGE_BASE_URL}/${account_details.avatar.tmdb.avatar_path}`,
        }}
        size={AVATAR_SIZE}
      />
    );
  } else if (!!account_details.name) {
    return (
      <Avatar.Text
        label={Utils.generateNameInitials(account_details.name)}
        size={AVATAR_SIZE}
      />
    );
  } else {
    return <Avatar.Icon icon={"account"} size={AVATAR_SIZE} />;
  }
};

export default ProfileAvatar;
