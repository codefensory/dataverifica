import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { components } from "./components";
import { foundations } from "./foundations";

const config: ThemeConfig = {
  cssVarPrefix: "dataverifica",
  useSystemColorMode: false,
  initialColorMode: "light",
};

const theme = extendTheme({
  ...config,
  ...foundations,
  components,
});

export default theme;
