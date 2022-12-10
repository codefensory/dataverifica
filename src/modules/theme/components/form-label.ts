import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
  fontSize: "sm",
  color: "gray.600",
});

export const formLabelTheme = defineStyleConfig({
  baseStyle,
});
