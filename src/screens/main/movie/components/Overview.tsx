import { View, StyleSheet } from "react-native";
import { Divider, Surface, Text } from "react-native-paper";
import { Link } from "expo-router";

import Utils from "@/src/common/Utils";
import { IMovieDetails } from "@/src/apis/movie/interfaces";

export interface IOverviewProps {
  details: IMovieDetails;
}

const Overview: React.FC<IOverviewProps> = ({ details }) => {
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
      <Text variant="headlineLarge" style={styles.title}>
        {title}{" "}
        <Text variant="titleLarge" style={styles.releaseYear}>
          ({release_year})
        </Text>
      </Text>

      <Surface style={styles.surface} elevation={4} mode="flat">
        <Divider />
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Text variant="titleMedium" style={styles.textCenter}>
              {Utils.formatDate(release_date)}
            </Text>
            {runtime && (
              <Text variant="titleMedium" style={styles.textCenter}>
                {" • "}
                {Utils.formatMinutesToHours(runtime)}
              </Text>
            )}
          </View>

          <View style={styles.row}>
            <Text variant="titleMedium" style={styles.textCenter}>
              {genres.map((g) => g.name).join(", ")}
            </Text>
          </View>
        </View>
        <Divider />
      </Surface>

      <View style={styles.contentContainer}>
        <Text variant="bodyLarge" style={styles.tagline}>
          "{tagline}"
        </Text>
        <Text variant="titleLarge">Overview</Text>
        <Text variant="bodyMedium">{overview}</Text>
        <Divider style={styles.divider} />

        <View>
          <Text variant="titleLarge">Production Companies</Text>
          {production_companies.map((company) => (
            <Text variant="bodyMedium" key={company.id}>
              • {company.name}
            </Text>
          ))}
        </View>
      </View>

      <Surface style={styles.surface} elevation={2} mode="flat">
        <Link href={`/main/movie/${id}/reviews`} asChild={Utils.isWeb()}>
          <View style={styles.linkContainer}>
            <Divider />
            <Text variant="titleLarge" style={styles.textCenter}>
              Reviews {"->"}
            </Text>
            <Divider />
          </View>
        </Link>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginTop: 12,
  },
  releaseYear: {
    textAlign: "center",
  },
  surface: {
    marginVertical: 12,
  },
  infoContainer: {
    padding: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  contentContainer: {
    padding: 12,
  },
  tagline: {
    textAlign: "center",
  },
  divider: {
    marginVertical: 8,
  },
  linkContainer: {
    alignItems: "center",
  },
});

export default Overview;
