import React, { FC } from "react";
import { Switch } from "react-native";
import theme from "../../theme/theme";
import { ToggleSwitchButtonProps } from "../../types/bottomSheetTypes";
import Box from "./Box";
import Text from "./Text";

const ToggleSwitchButton: FC<ToggleSwitchButtonProps> = ({
  publicBonsai,
  setPublic,
  title,
}) => {
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="flex-end"
      flexDirection="row"
      marginVertical="l"
    >
      <Box marginHorizontal="m">
        <Text variant="inputTitle" color="headline" fontSize={14}>
          {title}
        </Text>
      </Box>
      <Switch
        trackColor={{
          false: theme.colors.iconInactiveBackground,
          true: theme.colors.primaryBGColor,
        }}
        thumbColor={
          publicBonsai
            ? theme.colors.primaryGreenColor
            : theme.colors.iconInactive
        }
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setPublic(!publicBonsai)}
        value={publicBonsai}
      />
    </Box>
  );
};

export default ToggleSwitchButton;
