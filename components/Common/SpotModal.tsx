import React, { FC } from "react";
import { View, Image } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Box from "./Box";
import Text from "./Text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../theme/theme";
import { SpotItem } from "../../types/types";
import ObstacleImg from "./ObstacleImg";

interface SpotModalProps {
  spot: SpotItem;
}

const SpotModal: FC<SpotModalProps> = ({ spot }) => {
  const theme = useTheme<Theme>();
  const { title, images } = spot;

  return (
    <Box borderTopLeftRadius="s" borderTopRightRadius="s" paddingBottom="l">
      <View>
        <ScrollView
          contentContainerStyle={{ flexDirection: "row" }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {images &&
            images.map((img) => {
              return (
                <Box
                  backgroundColor="cardBg2"
                  marginHorizontal="s"
                  borderRadius="m"
                  key={img}
                >
                  <Image
                    style={{
                      width: 240,
                      height: 140,
                      borderRadius: theme.borderRadii.m,
                      zIndex: 999,
                    }}
                    source={{ uri: img }}
                  />
                  <SimpleLineIcons
                    name="picture"
                    size={32}
                    color="tomato"
                    style={{ position: "absolute", top: "42%", left: "42%" }}
                  />
                </Box>
              );
            })}
        </ScrollView>
      </View>

      <Box padding="m">
        <Text variant="h1">{title}</Text>
        <Box flexDirection="row" alignItems="center" marginVertical="s">
          <SimpleLineIcons
            name="location-pin"
            size={24}
            color={theme.colors.primaryColor}
            style={{ marginRight: 8 }}
          />
          <Text variant="body">
            {spot.adress.street +
              (spot.adress.streetnr ? " " + spot.adress.streetnr : "") +
              ", " +
              spot.adress.cap +
              " " +
              spot.adress.city}
          </Text>
        </Box>
      </Box>
      <Text variant="body" paddingLeft="m" marginVertical="s">
        Obstacles
      </Text>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          paddingLeft: theme.spacing.m,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {spot.obstacles.map((item) => (
          <Box
            key={item}
            backgroundColor="cardBg2"
            padding="s"
            marginRight="s"
            borderRadius="s"
            alignItems="center"
          >
            <ObstacleImg
              obstacleName={item}
              dimensions={{ width: 64, height: 50 }}
            />
            <Text variant="body">{item}</Text>
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
};

export default SpotModal;
