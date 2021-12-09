import * as React from "react";
import { FC } from "react";
import { useTheme } from "@shopify/restyle";
import theme, { Theme } from "../../../theme/theme";
//components
import Box from "../../Common/Box";
import Text from "../../Common/Text";

const EreignisView: FC = () => {
  const theme = useTheme<Theme>();

  return (
    <Box>
      <Text>LOL</Text>
    </Box>
  );
};

export default EreignisView;
