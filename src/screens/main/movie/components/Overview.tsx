import { View } from "react-native";
import { Divider, Surface, Text } from "react-native-paper";

import { IMovieDetails } from "@/src/apis/movie/interfaces";
import Utils from "@/src/common/Utils";
import { Link } from "expo-router";

export interface IOverviewProps {
  details: IMovieDetails;
}

const Overview: React.FC<IOverviewProps> = (props) => {
  const { details } = props;
  const {
    id,
    tagline,
    overview,
    production_companies,
    title,
    runtime,
    genres,
    release_date,
  } = details;
  const [release_year] = release_date.split("-");
  return (
    <View>
      <Text
        variant="headlineLarge"
        style={{ textAlign: "center", marginTop: 12 }}
      >
        {title}{" "}
        <Text variant="titleLarge" style={{ textAlign: "center" }}>
          ({release_year})
        </Text>
      </Text>
      <Surface style={{ marginVertical: 12 }} elevation={4} mode="flat">
        <Divider />
        <View style={{ padding: 8 }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text variant="titleMedium" style={{ textAlign: "center" }}>
              {Utils.formatDate(release_date)}
            </Text>
            {runtime && (
              <Text variant="titleMedium" style={{ textAlign: "center" }}>
                {" "}
                • {Utils.formatMinutesToHours(runtime)}
              </Text>
            )}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text variant="titleMedium" style={{ textAlign: "center" }}>
              {genres.map((g) => g.name).join(", ")}
            </Text>
          </View>
        </View>
        <Divider />
      </Surface>
      <View style={{ padding: 12 }}>
        <Text variant="bodyLarge" style={{ textAlign: "center" }}>
          "{tagline}"
        </Text>
        <Text variant="titleLarge">Overview</Text>
        <Text variant="bodyMedium">{overview}</Text>
        <Divider style={{ marginVertical: 8 }} />
        <View>
          <Text variant="titleLarge">Production Companies</Text>
          <View style={{ flex: 1 }} />
          {production_companies.map((company) => (
            <Text variant="bodyMedium" key={company.id}>
              • {company.name}
            </Text>
          ))}
        </View>
      </View>
      <Surface style={{ marginVertical: 12 }} elevation={2} mode="flat">
        <Link href={`/main/movie/${id}/reviews`} asChild={Utils.isWeb()}>
          <View>
            <Divider />
            <Text variant="titleLarge" style={{ textAlign: "center" }}>
              Reviews {"->"}
            </Text>
            <Divider />
          </View>
        </Link>
      </Surface>
    </View>
  );
};

export default Overview;
